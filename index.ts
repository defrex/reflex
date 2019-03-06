import * as next from 'next'
import * as chokidar from 'chokidar'
import { createConnection } from 'typeorm'

import config from 'config'
import api from 'api'
import probot from 'api/github/probot'
import gen from './bin/gen'

api.use(config.githubWebhookPath, probot.server)

const nextApp = next({
  dev: config.environment === 'development',
})
const nextHandler = nextApp.getRequestHandler()

api.use((req, res, next) => {
  if (req.path.startsWith(config.graphqlEndpoint)) {
    return next()
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

api.start({
  endpoint: config.graphqlEndpoint,
  playground: config.graphqlEndpoint,
  port: config.port,
}).catch(err => console.log('ERROR:', err))

createConnection()
