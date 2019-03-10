import { Application } from 'probot'
import * as Octokit from '@octokit/rest'
import { DateTime } from 'luxon'

import { absoluteUrl } from 'api/lib/url'
import GithubCheck from 'api/models/GithubCheck'

export default (probot: Application) => {
  probot.on('check_suite', async ({ payload, github }) => {
    const repoName = payload.repository.full_name
    const repoOwner = payload.repository.owner.login
    const headSha = payload.check_suite.head_sha

    let githubCheck = await GithubCheck.findOne({ repoName, repoOwner, headSha })
    if (!githubCheck) {
      githubCheck = new GithubCheck()
      githubCheck.repoName = repoName
      githubCheck.headSha = headSha
      githubCheck.repoOwner = repoOwner
      await githubCheck.save()
    }

    if (githubCheck.githubCheckId !== null) {
      probot.log(`Check exsists: ${repoOwner}/${repoName} ${headSha}`)
      return
    }

    const createCheckPayload: Octokit.ChecksCreateParams = {
      owner: repoOwner,
      repo: repoName,
      name: 'reflex',
      head_sha: headSha,
      details_url: absoluteUrl(`/github-checks/${githubCheck.id}`),
      external_id: `${githubCheck.id}`,
      status: 'in_progress',
      started_at: DateTime.fromJSDate(githubCheck.createdAt).toISO(),
    }

    const octokit = github as unknown as Octokit
    const check = await octokit.checks.create(createCheckPayload)

    githubCheck.githubCheckId = (check as any).id
    await githubCheck.save()

    probot.log(`Created check: ${repoName} ${headSha}`)
  })

  probot.on('check_run', async ({ name }) => {
    // re-run check
    probot.log('webhook', name)
  })
}
