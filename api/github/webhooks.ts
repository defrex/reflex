import { Application } from 'probot'

export default (probot: Application) => {
  probot.on('check_suite', async ({ payload }) => {
    const repoName = payload.repository.name
    const repoOwner = payload.repository.owner.login
    const commitSha = payload.check_suite.head_sha
    console.log(`✔️ ${repoOwner}/${repoName}#${commitSha}`)

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
