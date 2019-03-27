import express, { Application } from 'express'

import github from 'api/github'
import figma from 'api/figma'
import applyGraphqlMiddleware from 'api/graphql'

const router = express.Router()

router.use('/github', github)
router.use('/figma', figma)

export default async function applyMiddleware(app: Application) {
  app.use(router)
  await applyGraphqlMiddleware(app)
}
