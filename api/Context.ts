import User from './models/User'
import { Request, Response } from 'express'

export default interface Context {
  user?: User
}

export const getContext = async (
  req: Request,
  _res: Response,
): Promise<Context> => {
  return { user: req.user }
}
