import { loggedInUser } from 'api/lib/auth'
import { User } from 'api/prisma'
import { Request, Response } from 'express'

export type Context = {
  user?: User
  logout: () => void
}
// GraphQL Gen needs an export not named "Context"
export type ReflexContex = Context

export async function getContext({
  req,
  res,
}: {
  req: Request
  res: Response
}): Promise<Context> {
  const user = await loggedInUser(req, res)
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
