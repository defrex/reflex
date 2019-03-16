import express, { Request, Response, NextFunction } from 'express'

import github from 'api/github'
import figma from 'api/figma'
import { loggedInUser } from 'api/lib/auth'

const router = express.Router()

router.use('/github', github)
router.use('/figma', figma)

export default async function API(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.user = await loggedInUser(req)
  return router(req, res, next)
}
