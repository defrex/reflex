import next from 'next'
import chokidar from 'chokidar'
import { Request, Response } from 'express'

import api from 'api'
import config from 'api/config'
import probot from 'api/github/probot'
import conection from 'api/db'
import { absoluteUrl } from 'api/lib/url'
import { absolutePath } from 'api/lib/path'
import gen from 'api/lib/gen'
import routes from 'ui/routes'
import nextConfig from './next.config.js'

export default async function main () {
  api.use(config.githubWebhookPath, probot.server)

  const nextApp = next({
    dev: config.environment === 'development',
    dir: config.uiPath,
    conf: nextConfig,
  })
  const nextHandler = routes.getRequestHandler(nextApp)

  api.use(function (req: Request, res: Response, skip: Function) {
    if (req.path.startsWith(config.graphqlEndpoint)) {
      return skip()
    }

    if (req.path === '/service-worker.js') {
      nextApp.serveStatic(req, res, absolutePath('ui/.next/service-worker.js'))
      return
    }

    // @ts-ignore
    req.api = api
    nextHandler.apply(null, arguments)
  })

  if (config.environment === 'development') {
    const files = [config.graphqlSchemaPath, ...config.graphqlDocumentPaths]

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
