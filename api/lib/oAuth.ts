import config from 'api/config'
import { randomString } from 'api/lib/random'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { cookieOptions } from './auth'

export interface OAuthSessionPayload {
  state: string
}

export function startOAuthSession<T extends {}>(
  _req: Request,
  res: Response,
  extra?: T,
): OAuthSessionPayload & T {
  const state = randomString()
  const statePayload = { ...extra, state }
  res.cookie(
    'oAuthSession',
    jwt.sign(statePayload, config.secretKey),
    cookieOptions,
  )
  return statePayload as OAuthSessionPayload & T
}

export function finishOAuthSession<T>(
  req: Request,
  res: Response,
): OAuthSessionPayload & T {
  const payload = jwt.verify(req.cookies.oAuthSession, config.secretKey)
  res.clearCookie('oAuthSession')
  return payload as OAuthSessionPayload & T
}
