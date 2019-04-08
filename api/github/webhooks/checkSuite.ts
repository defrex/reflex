import { WebhookPayloadCheckSuite } from '@octokit/webhooks'
import { findOne } from 'api/lib/data'
import renderExample from 'api/lib/renderExample'
import { absoluteUrl } from 'api/lib/url'
import { Check, prisma, Repo } from 'api/prisma'
import { Context, Octokit } from 'probot'

export default async function({
  payload,
  github,
}: Context<WebhookPayloadCheckSuite>) {
  console.log('🐛 in checkSuite handler')

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
        headBranch: payload.check_suite.head_branch,
        headSha: payload.check_suite.head_sha,
        repo: {
          id: repo.id,
        },
      },
    }),
  )

  if (!check) {
    check = await prisma.createCheck({
      headBranch: payload.check_suite.head_branch,
      headSha: payload.check_suite.head_sha,
      repo: {
        connect: {
          id: repo.id,
        },
      },
    })
  }

  const components = await prisma
    .repo({ id: repo.id })
    .team()
    .components()

  for (const component of components) {
    const examples = await prisma.component({ id: component.id }).examples()
    for (const example of examples) {
      const renderExists = await prisma.$exists.render({
        check: {
          id: check.id,
        },
        example: {
          id: example.id,
        },
      })
      if (!renderExists) {
        const imageUrl = await renderExample(example)
        await prisma.createRender({
          imageUrl,
          check: {
            connect: {
              id: check.id,
            },
          },
          example: {
            connect: {
              id: example.id,
            },
          },
        })
      }
    }
  }

  if (!check.githubCheckId) {
    const createCheckPayload: Octokit.ChecksCreateParams = {
      owner: repo.owner,
      repo: repo.name,
      name: 'reflex',
      head_sha: check.headSha,
      details_url: absoluteUrl(
        `/checks/${repo.owner}/${repo.name}/${check.headSha}`,
      ),
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

    console.log(
      `✔️ ${repo.owner}/${repo.name}#${check.headBranch}/${check.headSha}`,
    )
  }
}
