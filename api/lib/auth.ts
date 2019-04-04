import { Request } from 'express'
import { prisma, User } from 'api/prisma'

export async function loggedInUser(req: Request): Promise<User | undefined> {
  if (!req.session) {
    console.warn('⚠ api/lib/auth:loggedInUser req.session is undefined')
    console.trace()
    return
  }
  if (req.session.userId) {
    return await prisma.user({ id: req.session.userId })
  }
}

export async function logInUser(req: Request, user: User) {
  if (!req.session) {
    throw new Error('Session not ready for login')
  }
  req.session.userId = user.id
}
