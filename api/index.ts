import figma from 'api/figma'
import github from 'api/github'
import applyGraphqlMiddleware from 'api/graphql'
import express, { Application } from 'express'

import cookieParser = require('cookie-parser')

const router = express.Router()

router.use('/github', github)
router.use('/figma', figma)

export default async function applyMiddleware(app: Application) {
  app.use(cookieParser())
  app.use('/api', router)
  await applyGraphqlMiddleware(app)
}
