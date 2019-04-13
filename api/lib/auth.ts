import config from 'api/config'
import { prisma, User } from 'api/prisma'
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

export function login(_req: Request, res: Response, user: User): AuthToken {
  const token = tokenForUser(user)
  res.cookie('Authorization', `Bearer ${token}`, cookieOptions)
  return token
}

export function logout(_req: Request, res: Response) {
  res.clearCookie('Authorization')
}
