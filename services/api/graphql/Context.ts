import { currentTeam, currentUser, logout } from 'api/lib/auth'
import { Team, User } from 'api/prisma'
import { Request, Response } from 'express'

export type Context = {
  user?: User
  team?: Team
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
  const user = await currentUser(req, res)
  const team = await currentTeam(req, res, user)
  return {
    user,
    team,
    logout: logout.bind(null, req, res),
  }
}