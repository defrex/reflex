import express from 'express'

import probot from './probot'
import auth from './auth'

const router = express.Router()

router.use('/probot', probot)
router.use('/auth', auth)

export default router
