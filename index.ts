import next from 'next'
import chokidar from 'chokidar'
import { Request, Response, NextFunction } from 'express-serve-static-core'

import api from 'api'
import config from 'api/config'
import apiRoutes from 'api/routes'
import conection from 'api/db'
import { absoluteUrl } from 'api/lib/url'
import gen from 'api/lib/gen'
import routes from 'ui/routes'
import nextConfig from './next.config.js'

export default async function main () {
  const nextApp = next({
    dev: config.environment === 'development',
    dir: config.uiPath,
    conf: nextConfig,
  })
  const nextHandler = routes.getRequestHandler(nextApp)

  api.express.use(function (req: Request, res: Response, next: NextFunction) {
    for (let [path, handler] of Object.entries(apiRoutes)) {
      if (req.path.startsWith(path)) {
        return handler(req, res, next)
      }
    }

    // @ts-ignore
    req.api = api
    return nextHandler(req, res, next)
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
