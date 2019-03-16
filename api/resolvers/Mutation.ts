import { MutationResolvers } from 'gen/resolvers'
import User from 'api/models/User'
import Context from 'api/Context'

export default {
  createUser: async (_parent, args, _ctx): Promise<User> => {
    const user = new User()

    user.name = args.input.name
    user.email = args.input.email

    await user.save()

    return user
  },
} as MutationResolvers.Resolvers<Context>
