import * as next from 'next'
import * as chokidar from 'chokidar'
import { createConnection } from 'typeorm'
import { Probot } from 'probot'

import config from 'config'
import api from 'api'
import github from 'api/github'
import gen from './bin/gen'

const reservedPaths = [
  config.githubWebhookPath,
  config.graphqlEndpoint,
]

const nextApp = next({
  dev: config.environment === 'development',
})
const nextHandler = nextApp.getRequestHandler()

api.use((req, res, next) => {
  for (let path of reservedPaths) {
    if (req.path.startsWith(path)) {
      return next()
    }
  }

  nextHandler(req, res, next)
})

if (config.environment === 'development') {
  const files = [
    config.graphqlSchemaPath,
    ...config.graphqlDocumentPaths,
  ]

  chokidar.watch(files).on('all', async () => {
    await gen()
    await nextApp.close()
    await nextApp.prepare()
  })
} else {
  nextApp.prepare()
}

const probot = new Probot({
  id: config.githubAppId,
  secret: config.githubWebhookSecret,
  cert: config.githubPrivateKey,
  // tunnel: process.env.SUBDOMAIN || process.env.NODE_ENV !== 'production',
})
probot.load(github)
api.use(config.githubWebhookPath, probot.server)

api.start({
  endpoint: config.graphqlEndpoint,
  playground: config.graphqlEndpoint,
  port: config.port,
}).catch(err => console.log('ERROR:', err))

createConnection()
