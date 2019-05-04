import config from 'api/config'
import checkSuite from 'api/github/webhooks/checkSuite'
import { Application, Probot } from 'probot'

console.log('githubAppPrivateKey', config.githubAppPrivateKey)
console.log(
  'githubAppPrivateKey.newlines',
  (config.githubAppPrivateKey.match(/\n/g) || []).length,
)
const key = config.githubAppPrivateKey
  .replace('-----BEGIN RSA PRIVATE KEY-----', '')
  .replace('-----END RSA PRIVATE KEY-----', '')
  .trim()
  .split(' ')
key.unshift('-----BEGIN RSA PRIVATE KEY-----')
key.push('-----END RSA PRIVATE KEY-----')
const cert = key.join('\n')

console.log('cert', cert)

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
