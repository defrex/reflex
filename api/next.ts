/// <reference path="../@types/Request.d.ts" />
import { Application, Request, Response, NextFunction } from 'express'
import next from 'next'
import chokidar from 'chokidar'
import express from 'express'

import { absolutePath } from 'api/lib/path'
import gen from 'api/lib/gen'
import config from 'api/config'
import uiRoutes from 'ui/routes'

export default async (app: Application) => {
  const nextApp = next({
    dev: config.environment === 'development',
    dir: config.uiPath,
  })

  const nextHandler = uiRoutes.getRequestHandler(nextApp)

  app.use(
    '/service-worker.js',
    express.static(absolutePath('ui/.next/service-worker.js')),
  )

  if (config.environment === 'development') {
    const files = [
      config.graphqlSchemaPath.replace('index', '*'),
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

  app.use(function(req: Request, res: Response, skip: NextFunction) {
    if (req.path.startsWith(config.graphqlEndpoint)) {
      return skip()
    }
    nextHandler(req, res, skip)
  })
}
