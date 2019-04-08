import express from 'express'
import auth from './auth'
import webhooks from './webhooks'

const router = express.Router()

router.use('/webhooks', webhooks)
router.use('/auth', auth)

export default router
