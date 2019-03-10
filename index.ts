import next from 'next'
import chokidar from 'chokidar'

import api from 'api'
import config from 'api/config'
import probot from 'api/github/probot'
import conection from 'api/db'
import { absoluteUrl } from 'api/lib/url'
import gen from 'api/lib/gen'
import routes from 'ui/routes'

export default async function main () {
  api.use(config.githubWebhookPath, probot.server)

  const nextApp = next({
    dev: config.environment === 'development',
    dir: config.uiPath,
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
