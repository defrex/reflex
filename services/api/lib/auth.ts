import config from 'api/config'
import { AuthenticationError, NotImplementedError } from 'api/exceptions'
import { prisma, Team, User } from 'api/prisma'
import { CookieOptions, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import encodeGetParams from './encodeGetParams'
import uiUrl from './uiUrl'

type AuthToken = string

interface AuthPayload {
  userId: string
}

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.ssl,
}

export function tokenForUser(user: User): AuthToken {
  const payload: AuthPayload = {
    userId: user.id,
  }
  return jwt.sign(payload, config.secretKey)
}

export function userForToken(token: AuthToken): Promise<User> {
  let payload
  try {
    payload = jwt.verify(token, config.secretKey) as AuthPayload
  } catch (e) {}
  if (payload && payload.userId) {
    return prisma.user({ id: payload.userId })
  }
  throw new AuthenticationError('Invalid token')
}

export async function currentUser(
  req: Request,
  _res: Response,
): Promise<User | undefined> {
  let authorization = req.cookies.Authorization
  if (!authorization) {
    authorization = req.header('Authorization')
  }

  if (!authorization) {
    return
  }

  const token: AuthToken = authorization.replace(/^Bearer\s/, '')
  return await userForToken(token)
}

export async function currentTeam(
  _req: Request,
  _res: Response,
  user?: User,
): Promise<Team | undefined> {
  if (!user) {
    return
  }

  const memberships = await prisma.memberships({
    where: { user: { id: user.id } },
  })
  if (memberships.length === 0) {
    return
  } else if (memberships.length > 1) {
    throw new NotImplementedError('TODO: handle multiple memberships in auth')
  }

  return await prisma.membership({ id: memberships[0].id }).team()
}

export function login(_req: Request, res: Response, user: User) {
  const token = tokenForUser(user)
  res.cookie('Authorization', `Bearer ${token}`, cookieOptions)
  res.redirect(encodeGetParams(uiUrl('/api/login'), { token }))
}

export function logout(_req: Request, res: Response) {
  res.clearCookie('Authorization')
}
