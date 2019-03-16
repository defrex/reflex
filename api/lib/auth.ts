import { Request } from 'express'
import User from 'api/models/User'

export async function loggedInUser(req: Request): Promise<User | undefined> {
  const userId = req.session!.userId
  if (userId) {
    return await User.findOne(userId)
  }
}

export async function logInUser(req: Request, user: User) {
  req.session!.userId = user.id
}
