import next from 'next'
import chokidar from 'chokidar'
import express, { Request, Response } from 'express'
import { GraphQLSchema } from 'graphql'

import graphqlServer from 'api/graphql'
import config from 'api/config'
import conection from 'api/db'
import { absoluteUrl } from 'api/lib/url'
import { absolutePath } from 'api/lib/path'
import gen from 'api/lib/gen'
import apiRoutes from 'api/routes'
import Context from 'api/context'
import uiRoutes from 'ui/routes'

interface GraphSchemaRequest extends Request {
  graphqlSchema?: GraphQLSchema
  graphqlContext?: Context
}

export default async function main () {
  const nextApp = next({
    dev: config.environment === 'development',
    dir: config.uiPath,
  })
  const nextHandler = uiRoutes.getRequestHandler(nextApp)

  graphqlServer.use(
    '/service-worker.js',
    express.static(absolutePath('ui/.next/service-worker.js')),
  )
  graphqlServer.use('/api', apiRoutes)

  graphqlServer.use(function (
    req: GraphSchemaRequest,
    _res: Response,
    skip: Function,
  ) {
    if (req.path.startsWith(config.graphqlEndpoint)) {
      return skip()
    }

    req.graphqlSchema = graphqlServer.executableSchema
    req.graphqlContext = graphqlServer.context
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
