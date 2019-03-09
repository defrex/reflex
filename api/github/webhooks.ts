import { Application } from 'probot'

import { absoluteUrl } from 'api/lib/url'
import GithubCheck from 'api/models/GithubCheck'

export default (probot: Application) => {
  probot.on('check_suite', async ({ name, payload, checks }) => {
    // create check
    probot.log(name)
    const githubRepoId = payload.repository.id
    const githubCheckSuiteId = payload.check_suite.id

    let githubCheck = await GithubCheck.findOne({ githubRepoId, githubCheckSuiteId })
    if (!githubCheck) {
      githubCheck = new GithubCheck()
      githubCheck.githubRepoId = githubRepoId
      githubCheck.githubCheckSuiteId = githubCheckSuiteId
      await githubCheck.save()
    }

    await checks.create({
      name: 'reflex',
      head_sha: payload.check_suite.head_sha,
      details_url: absoluteUrl(`/github-checks/${githubCheck.id}`),
      external_id: githubCheck.id,
      status: 'in_progress',
      // owner,
      // repo,
      // status,
      // started_at,
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

    probot.log(`Created check for repo ${githubRepoId} and suite ${githubCheckSuiteId}`)
  })
  probot.on('check_run', async ({ name }) => {
    // re-run check
    probot.log('webhook', name)
  })
}
