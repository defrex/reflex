import * as next from 'next'
import * as chokidar from 'chokidar'

import config from 'config'
import api from 'api'
import probot from 'api/github/probot'
import conection from 'api/db'
import { absoluteUrl } from 'api/lib/url'
import routes from './routes'
import gen from './bin/gen'

export default async function main () {
  api.use(config.githubWebhookPath, probot.server)

  const nextApp = next({
    dev: config.environment === 'development',
  })
  const nextHandler = routes.getRequestHandler(nextApp)

  api.use(function (req, res, skip) {
    if (req.path.startsWith(config.graphqlEndpoint)) {
      return skip()
    }
    nextHandler.apply(this, arguments)
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
    await nextApp.prepare()
  }

  await conection

  try {
    await api.start({
      endpoint: config.graphqlEndpoint,
      playground: config.graphqlEndpoint,
      port: config.port,
    })
  } catch (error) {
    console.log('ERROR:', error)
  }

  console.log(absoluteUrl('/'))
}
