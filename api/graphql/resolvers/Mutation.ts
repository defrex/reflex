import { MutationResolvers } from 'api/graphql/types'

import User from 'api/models/User'
import { Context } from 'api/graphql/Context'
import { CreateUserResponse, LogoutResponse } from 'ui/lib/graphql'

import { success } from './lib'

export default {
  createUser: async (_parent, args, _ctx): Promise<CreateUserResponse> => {
    const user = new User()

    user.name = args.input.name
    user.email = args.input.email

    await user.save()

    return success({ user })
  },

  logout: async (_parent, _args, ctx): Promise<LogoutResponse> => {
    ctx.logout()
    return success()
  },
} as MutationResolvers<Context>
