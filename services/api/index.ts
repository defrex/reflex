import config from 'api/config'
import figma from 'api/figma'
import github from 'api/github'
import applyGraphqlMiddleware from 'api/graphql'
import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'

export default async function main() {
  const app = express()

  app.use(morgan(config.environment === 'development' ? 'dev' : 'common'))

  app.use(cookieParser())

  app.use('/github', github)
  app.use('/figma', figma)

  await applyGraphqlMiddleware(app)

  app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`)
  })
}
