import { PubSub } from '@google-cloud/pubsub'
import { WebhookPayloadCheckSuite } from '@octokit/webhooks'
import { findOne } from 'api/lib/data'
import { absoluteUrl } from 'api/lib/url'
import { Check, prisma, Repo } from 'api/prisma'
import { Context, Octokit } from 'probot'
import { libraryRoute } from 'ui/lib/routes'

const pubsub = new PubSub()
const sampleRequestsTopic = 'sample-requests'

interface Payload {
  hello: string
  checkId: string
}

async function publishSampleRequest(payload: Payload) {
  const data = Buffer.from(JSON.stringify(payload))
  const messageId = await pubsub.topic(sampleRequestsTopic).publish(data)
  console.info(`Published ${sampleRequestsTopic}/${messageId}`)
}

export default async function({
  payload,
  github,
}: Context<WebhookPayloadCheckSuite>) {
  const repo = await findOne<Repo>(
    prisma.repoes({
      where: {
        name: payload.repository.name,
        owner: payload.repository.owner.login,
      },
    }),
  )

  if (!repo) {
    return
  }

  let check = await findOne<Check>(
    prisma.checks({
      where: {
        branch: payload.check_suite.head_branch,
        commit: payload.check_suite.head_sha,
        repo: {
          id: repo.id,
        },
      },
    }),
  )

  if (!check) {
    check = await prisma.createCheck({
      branch: payload.check_suite.head_branch,
      commit: payload.check_suite.head_sha,
      repo: {
        connect: {
          id: repo.id,
        },
      },
    })
  }

  if (!check.githubCheckId) {
    const team = await prisma.repo({ id: repo.id }).team()
    const createCheckPayload: Octokit.ChecksCreateParams = {
      owner: repo.owner,
      repo: repo.name,
      name: 'reflex',
      head_sha: check.commit,
      details_url: absoluteUrl(libraryRoute({ teamId: team.id })),
      external_id: check.id,
      status: 'in_progress',
      started_at: check.createdAt,
    }

    const githubCheck = await github.checks.create(createCheckPayload)

    await prisma.updateCheck({
      data: {
        githubCheckId: githubCheck.data.id,
      },
      where: {
        id: check.id,
      },
    })

    await publishSampleRequest({
      hello: 'GitHub',
      checkId: check.id,
    })

    console.log(`✔️ ${repo.owner}/${repo.name}#${check.branch}/${check.commit}`)
  }
}
