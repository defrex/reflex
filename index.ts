/// <reference path="./@types/Request.d.ts" />
import next from 'next'
import chokidar from 'chokidar'
import express, { Request, Response, NextFunction } from 'express'
import cookieSession from 'cookie-session'

import graphqlServer from 'api/graphql'
import config from 'api/config'
import conection from 'api/db'
import { absoluteUrl } from 'api/lib/url'
import { absolutePath } from 'api/lib/path'
import gen from 'api/lib/gen'
import apiRoutes from 'api/routes'
import uiRoutes from 'ui/routes'

export default async function main() {
  await conection

  const nextApp = next({
    dev: config.environment === 'development',
    dir: config.uiPath,
  })

  const nextHandler = uiRoutes.getRequestHandler(nextApp)

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

  graphqlServer.use(
    cookieSession({
      secret: config.secretKey,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: config.ssl,
      sameSite: 'lax',
    }),
  )

  graphqlServer.use(
    '/service-worker.js',
    express.static(absolutePath('ui/.next/service-worker.js')),
  )
  graphqlServer.use('/api', apiRoutes)

  graphqlServer.use(function(req: Request, res: Response, skip: NextFunction) {
    if (req.path.startsWith(config.graphqlEndpoint)) {
      return skip()
    }

    req.graphqlSchema = graphqlServer.executableSchema
    req.graphqlContext = graphqlServer.context
    nextHandler(req, res, skip)
  })

  try {
    await graphqlServer.start({
      endpoint: config.graphqlEndpoint,
      playground: config.graphqlEndpoint,
      port: config.port,
    })
  } catch (error) {
    console.log('ERROR:', error)
  }

  console.log(absoluteUrl('/'))
}
