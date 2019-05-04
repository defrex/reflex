import { Context } from 'api/graphql/Context'
import { UserResolvers } from 'api/graphql/types'

export default {
  figmaConnected: async (user, _args, _ctx) => {
    return !!user.figmaAccessToken
  },
  githubConnected: async (user, _args, _ctx) => {
    return !!user.githubAccessToken
  },
} as UserResolvers<Context>
