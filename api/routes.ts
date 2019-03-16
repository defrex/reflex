import express from 'express'
import { Request, Response, NextFunction } from 'express-serve-static-core'

import { absolutePath } from 'api/lib/path'
import probot from 'api/github/probot'
import config from 'api/config'

type RouteHandlers = {
  [key: string]: (req: Request, res: Response, next: NextFunction) => any
}

export default {
  [config.githubWebhookPath]: probot.server,
  [config.graphqlEndpoint]: (
    _req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    next()
  },
  '/service-worker.js': express.static(
    absolutePath('ui/.next/service-worker.js'),
  ),
} as RouteHandlers
