import { Request } from 'express'

import User from 'api/models/User'
import { loggedInUser } from 'api/lib/auth'

export type Context = {
  user?: User
  logout: () => void
}

export const getContext = async (req: Request): Promise<Context> => {
  const user = await loggedInUser(req)
  return {
    user,
    logout: () => {
      console.log('TODO: 🚪 fix logout')
      // @ts-ignore
      req.session = null
      // TODO: this isn't working
    },
  }
}
