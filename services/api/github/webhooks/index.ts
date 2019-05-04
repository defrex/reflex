import config from 'api/config'
import checkSuite from 'api/github/webhooks/checkSuite'
import { Application, Probot } from 'probot'

console.log(config.githubAppPrivateKey)
const probot = new Probot({
  id: config.githubAppId,
  secret: config.githubAppWebhookSecret,
  cert: config.githubAppPrivateKey,
  // tunnel: process.env.SUBDOMAIN || process.env.NODE_ENV !== 'production',
})

probot.load((probot: Application) => {
  probot.on('check_suite', checkSuite)
})

export default probot.server
