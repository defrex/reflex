import express from 'express'

import webhooks from './webhooks'
import auth from './auth'

const router = express.Router()

router.use('/probot', webhooks)
router.use('/auth', auth)

export default router
