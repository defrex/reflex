import { Router } from 'express'

import auth from 'api/figma/auth'

const router = Router()

router.get('/auth', auth)

export default router
