import config from 'api/config'
import { CliAuthSession, prisma } from 'api/prisma'
import jwt from 'jsonwebtoken'
import { DateTime } from 'luxon'

type Token = string

export interface CliSessionPayload {
  sessionId: string
  exp: number
}

export function defaultExpiresAt(): string {
  return DateTime.local()
    .plus({ hours: 1 })
    .toISO()
}

export function tokenForAuthSession(session: CliAuthSession): Token {
  const payload = {
    sessionId: session.id,
    exp: DateTime.fromISO(session.expiresAt).toSeconds(),
  } as CliSessionPayload
  return jwt.sign(payload, config.secretKey)
}

export async function authSessionForToken(
  token: Token,
): Promise<CliAuthSession | void> {
  const payload = jwt.verify(token, config.secretKey) as any
  if (payload && payload.sessionId) {
    return prisma.cliAuthSession({ id: payload.sessionId })
  }
}
