import express from 'express'
import cookieSession from 'cookie-session'

import applyGraphqlMiddleware from 'api/graphql'
import applyNextMiddleware from 'api/next'
import config from 'api/config'
import conection from 'api/db'
import { absoluteUrl } from 'api/lib/url'
import apiRoutes from 'api/routes'

export default async function main() {
  await conection

  const app = express()

  app.use(
    cookieSession({
      secret: config.secretKey,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: config.ssl,
      sameSite: 'lax',
    }),
  )

  app.get('/hits', (req, res) => {
    if (!req.session) {
      res.send('Session unavailable')
      return
    }

    req.session.hits = (req.session.hits || 0) + 1
    res.send(req.session.hits + ' 👊')
  })

  app.use('/api', apiRoutes)

  await applyGraphqlMiddleware(app)
  await applyNextMiddleware(app)

  app.listen(config.port)

  console.log(absoluteUrl('/'))
}
