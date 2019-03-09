import { Application } from 'probot'
import * as Octokit from '@octokit/rest'

import { absoluteUrl } from 'api/lib/url'
import GithubCheck from 'api/models/GithubCheck'

export default (probot: Application) => {
  probot.on('check_suite', async ({ name, payload, github }) => {
    console.log('name', name)
    const repo = payload.repository.full_name
    const headSha = payload.check_suite.head_sha

    console.log('repo', repo)
    console.log('headSha', headSha)

    let githubCheck = await GithubCheck.findOne({ repo, headSha })
    console.log('githubCheck.found', githubCheck)
    if (!githubCheck) {
      githubCheck = new GithubCheck()
      githubCheck.repo = repo
      githubCheck.headSha = headSha
      await githubCheck.save()
      console.log('githubCheck.new', githubCheck)
    }

    if (githubCheck.githubCheckId !== null) {
      probot.log(`Check exsists: ${repo} ${headSha}`)
      return
    }

    console.log('creating via octobot')
    const octokit = github as unknown as Octokit
    const check = await octokit.checks.create({
      owner: payload.repository.owner,
      repo: payload.repository.name,
      name: 'reflex',
      head_sha: payload.check_suite.head_sha,
      details_url: absoluteUrl(`/github-checks/${githubCheck.id}`),
      external_id: `${githubCheck.id}`,
      status: 'in_progress',
      started_at: githubCheck.createdAt.toString(),
      // status,
      // conclusion,
      // completed_at,
      // output,
      // output.title,
      // output.summary,
      // output.text,
      // output.annotations,
      // output.annotations[].path,
      // output.annotations[].start_line,
      // output.annotations[].end_line,
      // output.annotations[].start_column,
      // output.annotations[].end_column,
      // output.annotations[].annotation_level,
      // output.annotations[].message,
      // output.annotations[].title,
      // output.annotations[].raw_details,
      // output.images,
      // output.images[].alt,
      // output.images[].image_url,
      // output.images[].caption,
      // actions,
      // actions[].label,
      // actions[].description,
      // actions[].identifier,
    })
    console.log('check', check)

    githubCheck.githubCheckId = check.id
    await githubCheck.save()

    probot.log(`Created check: ${repo} ${headSha}`)
  })
  probot.on('check_run', async ({ name }) => {
    // re-run check
    probot.log('webhook', name)
  })
}
