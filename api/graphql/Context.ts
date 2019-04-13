import { currentUser, logout } from 'api/lib/auth'
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
  return {
    user: await currentUser(req, res),
    logout: logout.bind(null, req, res),
  }
}
