import express from 'express'
import cookieSession from 'cookie-session'
import chokidar from 'chokidar'

import gen from 'api/lib/gen'
import applyApiMiddleware from 'api'
import applyUiMiddleware from 'ui/server'
import config from 'api/config'
import { absoluteUrl } from 'api/lib/url'

export default async function main() {
  const app = express()

  app.use(
    cookieSession({
      secret: config.secretKey,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
    }),
  )

  app.use(express.static('public'))

  await applyApiMiddleware(app)
  await applyUiMiddleware(app)

  if (config.environment === 'development') {
    const files = [
      config.graphqlSchemaPath.replace('index', '*'),
      ...config.graphqlDocumentPaths,
    ]
    chokidar.watch(files, { ignoreInitial: true }).on('all', gen)
  }

  app.listen(config.port, () => {
    console.log(absoluteUrl('/'))
  })
}
