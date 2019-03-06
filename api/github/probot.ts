import { Probot } from 'probot'

import config from 'config'
import probotAppfunction from './index'

const probot = new Probot({
  id: config.githubAppId,
  secret: config.githubWebhookSecret,
  cert: config.githubPrivateKey,
  // tunnel: process.env.SUBDOMAIN || process.env.NODE_ENV !== 'production',
})
probot.load(probotAppfunction)

export default probot
