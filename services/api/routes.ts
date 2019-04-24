import express from 'express'

import github from 'api/github'
import figma from 'api/figma'

const router = express.Router()

router.use('/github', github)
router.use('/figma', figma)

export default router
