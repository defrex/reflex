import { Context } from 'api/graphql/Context'
import { CheckResolvers } from 'api/graphql/types'

export default {
  repoSource: async (_check) => {
    // TODO: download (stream?) repo source code
    return ''
  },
} as CheckResolvers<Context>
