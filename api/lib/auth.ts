import config from 'api/config'
import { randomString } from 'api/lib/random'
import { prisma, User } from 'api/prisma'
import { CookieOptions, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface AuthPayload {
  userId: string
}

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.ssl,
  sameSite: 'strict',
}

export async function loggedInUser(
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

  const token = authorization.replace(/^Bearer\s/, '')

  const payload = jwt.verify(token, config.secretKey) as AuthPayload
  return await prisma.user({ id: payload.userId })
}

export async function logInUser(_req: Request, res: Response, user: User) {
  const payload: AuthPayload = {
    userId: user.id,
  }
  const token = jwt.sign(payload, config.secretKey)
  res.cookie('Authorization', `Bearer ${token}`, cookieOptions)
}

export function logOutUser(_req: Request, res: Response) {
  res.clearCookie('Authorization')
}

interface OAuthStatePayload {
  state: string
}

export function startOAuthState(_req: Request, res: Response): string {
  const state = randomString()
  const statePayload: OAuthStatePayload = { state }
  res.cookie(
    'oAuthState',
    jwt.sign(statePayload, config.secretKey),
    cookieOptions,
  )
  return state
}

export function finishOAuthState(req: Request, res: Response): string {
  const payload = jwt.verify(
    req.cookies.oAuthState,
    config.secretKey,
  ) as OAuthStatePayload
  res.clearCookie('oAuthState')
  return payload.state
}
