import { Application } from 'probot'

import GithubCheck from 'api/models/GithubCheck'

export default (probot: Application) => {
  probot.on('check_suite', async ({ name, payload }) => {
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
    probot.log(`Created check for repo ${githubRepoId} and suite ${githubCheckSuiteId}`)
  })
  probot.on('check_run', async ({ name }) => {
    // re-run check
    probot.log('webhook', name)
  })
}
