import { WebhookPayloadCheckSuite } from '@octokit/webhooks'
import absoluteUrl from 'api/lib/absoluteUrl'
import callFunction from 'api/lib/callFunction'
import { findOne } from 'api/lib/data'
import { Check, prisma, Repo } from 'api/prisma'
import { Context, Octokit } from 'probot'

interface Payload {
  hello: string
  checkId: string
}

export default async function checkSuite({
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
      details_url: absoluteUrl(`/teams/${team.id}/library`),
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

    await callFunction('sampler', {
      hello: 'GitHub',
      checkId: check.id,
    } as Payload)

    console.log(`✔️ ${repo.owner}/${repo.name}#${check.branch}/${check.commit}`)
  }
}
