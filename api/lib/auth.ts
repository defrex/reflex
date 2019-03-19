import { Request } from 'express'
import User from 'api/models/User'

export async function loggedInUser(req: Request): Promise<User | undefined> {
  if (req.session && req.session.userId) {
    return await User.findOne(req.session.userId)
  }
}

export async function logInUser(req: Request, user: User) {
  req.session!.userId = user.id
}
