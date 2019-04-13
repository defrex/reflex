import { WebhookPayloadCheckSuite } from '@octokit/webhooks'
import { findOne } from 'api/lib/data'
import { absoluteUrl } from 'api/lib/url'
import { Check, prisma, Repo } from 'api/prisma'
import { Context, Octokit } from 'probot'
import { libraryRoute } from 'ui/lib/routes'

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

  // TODO: use new render style

  // const components = await prisma
  //   .repo({ id: repo.id })
  //   .team()
  //   .components()

  // for (const component of components) {
  //   const samples = await prisma.component({ id: component.id }).samples()
  //   for (const sample of samples) {
  //     const renderExists = await prisma.$exists.render({
  //       check: {
  //         id: check.id,
  //       },
  //       sample: {
  //         id: sample.id,
  //       },
  //     })
  //     if (!renderExists) {
  //       const imageUrl = await renderSample(sample)
  //       await prisma.createRender({
  //         imageUrl,
  //         check: {
  //           connect: {
  //             id: check.id,
  //           },
  //         },
  //         sample: {
  //           connect: {
  //             id: sample.id,
  //           },
  //         },
  //       })
  //     }
  //   }
  // }

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

    console.log(`✔️ ${repo.owner}/${repo.name}#${check.branch}/${check.commit}`)
  }
}
