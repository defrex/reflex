import express from 'express'

import probot from 'api/github/probot'
import figma from 'api/figma'

const router = express.Router()

router.use('/github', probot.server)
router.use('/figma', figma)

export default router
