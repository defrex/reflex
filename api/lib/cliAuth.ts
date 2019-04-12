import config from 'api/config'
import { CliAuthSession, prisma } from 'api/prisma'
import jwt from 'jsonwebtoken'
import { DateTime } from 'luxon'

type Token = string

export interface CliSessionPayload {
  sessionId: string
  exp: number
}

export async function startCliAuthSession(): Promise<Token> {
  const expiresAt = DateTime.local().plus({ hours: 1 })

  const cliAuthSession = await prisma.createCliAuthSession({
    expiresAt: expiresAt.toISO(),
  })
  const payload: CliSessionPayload = {
    sessionId: cliAuthSession.id,
    exp: expiresAt.toSeconds(),
  }
  return jwt.sign(payload, config.secretKey)
}

export async function checkCliAuthSession(
  token: Token,
): Promise<CliAuthSession | void> {
  const payload = jwt.verify(token, config.secretKey) as CliSessionPayload
  return prisma.cliAuthSession({ id: payload.sessionId })
}
