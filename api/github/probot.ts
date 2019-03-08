import { Probot } from 'probot'

import config from 'config'
import webhookHandler from './webhooks'

const probot = new Probot({
  id: config.githubAppId,
  secret: config.githubWebhookSecret,
  cert: config.githubPrivateKey,
  // tunnel: process.env.SUBDOMAIN || process.env.NODE_ENV !== 'production',
})
probot.load(webhookHandler)

export default probot
