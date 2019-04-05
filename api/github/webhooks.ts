import { Application } from 'probot'
import { Repo, Check, prisma, Render } from 'api/prisma'
import { findOne } from 'api/lib/data'
import renderExample from 'api/lib/renderExample'

export default (probot: Application) => {
  probot.on('check_suite', async ({ payload }) => {
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

    console.log(
      `✔️ ${repo.owner}/${repo.name}#${check.headBranch}/${check.headSha}`,
    )

    // const createCheckPayload: Octokit.ChecksCreateParams = {
    //   owner: repoOwner,
    //   repo: repoName,
    //   name: 'reflex',
    //   head_sha: commitSha,
    //   details_url: absoluteUrl(`/checks/${repoOwner}/${repoName}/${commitSha}`),
    //   external_id: `${githubCheck.id}`,
    //   status: 'in_progress',
    //   started_at: DateTime.fromJSDate(githubCheck.createdAt).toISO(),
    // }

    // console.log(createCheckPayload)
    // const octokit = (github as unknown) as Octokit
    // const check = await octokit.checks.create(createCheckPayload)

    // githubCheck.githubCheckId = (check as any).id
    // await githubCheck.save()

    // probot.log(`Created check: ${repoName} ${commitSha}`)
  })

  // probot.on('check_run', async ({ name }) => {
  //   // re-run check
  //   probot.log('webhook', name)
  // })
}
