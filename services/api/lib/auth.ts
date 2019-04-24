import config from 'api/config'
import { NotImplementedError } from 'api/exceptions'
import { prisma, Team, User } from 'api/prisma'
import { CookieOptions, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

type AuthToken = string

interface AuthPayload {
  userId: string
}

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.ssl,
  sameSite: 'strict',
}

export function tokenForUser(user: User): AuthToken {
  const payload: AuthPayload = {
    userId: user.id,
  }
  return jwt.sign(payload, config.secretKey)
}

export function userForToken(token: AuthToken): Promise<User> {
  const payload = jwt.verify(token, config.secretKey) as AuthPayload
  return prisma.user({ id: payload.userId })
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

export function login(_req: Request, res: Response, user: User): AuthToken {
  const token = tokenForUser(user)
  res.cookie('Authorization', `Bearer ${token}`, cookieOptions)
  return token
}

export function logout(_req: Request, res: Response) {
  res.clearCookie('Authorization')
}
