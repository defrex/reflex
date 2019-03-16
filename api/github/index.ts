import { Probot } from 'probot'

import config from 'api/config'
import webhookHandler from 'api/github/webhooks'

const probot = new Probot({
  id: config.githubAppId,
  secret: config.githubWebhookSecret,
  cert: config.githubPrivateKey,
  // tunnel: process.env.SUBDOMAIN || process.env.NODE_ENV !== 'production',
})
probot.load(webhookHandler)

export default probot.server
