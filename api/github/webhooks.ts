import { Application } from 'probot'

import { GithubCheck } from 'models/GithubCheck'
import { appendFile } from 'fs'

export default (probot: Application) => {
  probot.on('pull_request', async (context) => {
    probot.log(context.name)
  })
  probot.on('check_suite', async ({ name, payload }) => {
    // create check
    probot.log(name)
    const githubRepoId = payload.repository.id
    const githubCheckSuiteId = payload.check_suite.id

    let githubCheck = await GithubCheck.findOne({ githubRepoId, githubCheckSuiteId })
    if (!githubCheck) {
      githubCheck = new GithubCheck()
      githubCheck.githubCheck = githubCheck
      githubCheck.githubCheckSuiteId = githubCheckSuiteId
      await githubCheck.save()
    }
    probot.log(`Created check for repo ${githubRepoId} and suite ${githubCheckSuiteId}`)
  })
  probot.on('check_run', async ({ name, payload }) => {
    // re-run check
    probot.log(context.name)
  })
}
