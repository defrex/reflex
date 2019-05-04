import config from 'api/config'
import checkSuite from 'api/github/webhooks/checkSuite'
import { Application, Probot } from 'probot'

// GCP strips newlines out of ENV vars. This fixes the key.
const certLines = config.githubAppPrivateKey
  .replace('-----BEGIN RSA PRIVATE KEY-----', '')
  .replace('-----END RSA PRIVATE KEY-----', '')
  .trim()
  .split(' ')
certLines.unshift('-----BEGIN RSA PRIVATE KEY-----')
certLines.push('-----END RSA PRIVATE KEY-----')
const cert = certLines.join('\n')

const probot = new Probot({
  id: config.githubAppId,
  secret: config.githubAppWebhookSecret,
  cert, //: config.githubAppPrivateKey,
  // tunnel: process.env.SUBDOMAIN || process.env.NODE_ENV !== 'production',
})

probot.load((probot: Application) => {
  probot.on('check_suite', checkSuite)
})

export default probot.server
