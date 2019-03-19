import User from './models/User'
import { Request } from 'express'

import { loggedInUser } from 'api/lib/auth'

export default interface Context {
  user?: User
}

export const getContext = async (req: Request): Promise<Context> => {
  const user = await loggedInUser(req)
  return { user }
}
