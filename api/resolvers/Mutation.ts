import { CreateUserMutationArgs } from 'gen/schema'
import User from 'api/models/User'
import Context from 'api/context'

export default {
  createUser: async (
    _parent: null,
    args: CreateUserMutationArgs,
    _ctx: Context
  ): Promise<User> => {
    const user = new User()

    user.name = args.input.name
    user.email = args.input.email

    await user.save()

    return user
  },
}
