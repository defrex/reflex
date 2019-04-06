import { Octokit, Context } from 'probot'
import { WebhookPayloadCheckSuite } from '@octokit/webhooks'

import { Repo, Check, prisma, Render } from 'api/prisma'
import { findOne } from 'api/lib/data'
import renderExample from 'api/lib/renderExample'
import { absoluteUrl } from 'api/lib/url'

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
      const render = findOne<Render>(
        prisma.example({ id: example.id }).renders({
          where: {
            check: {
              id: check.id,
            },
          },
        }),
      )
      if (!render) {
        const render = await renderExample(example)
        prisma.updateRender({
          data: {
            check: {
              connect: {
                id: check.id,
              },
            },
          },
          where: {
            id: render.id,
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
      external_id: `${check.id}`,
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
