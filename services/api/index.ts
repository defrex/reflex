import config from 'api/config'
import figma from 'api/figma'
import github from 'api/github'
import applyGraphqlMiddleware from 'api/graphql'
import auth from 'api/lib/auth'
import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'

export default async function main() {
  const app = express()

  app.use(
    morgan(
      config.environment === 'development'
        ? 'dev'
        : [
            ':remote-addr',
            'HTTP/:http-version"',
            ':method',
            ':url',
            ':status',
            ':res[content-length]',
          ].join(' '),
    ),
  )

  app.use(cookieParser())

  app.use('/github', github)
  app.use('/figma', figma)
  app.get('/auth', auth)

  await applyGraphqlMiddleware(app)

  app.listen(config.port, () => {
    process.stderr.write(`http://localhost:${config.port}\n`)
  })
}
