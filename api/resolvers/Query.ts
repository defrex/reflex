import { QueryResolvers } from 'gen/resolvers'
import GithubCheck from 'api/models/GithubCheck'
import Context from 'api/Context'
import { FindConditions } from 'typeorm'

export default {
  hello: (_parent, _args, _ctx) => {
    return 'Hello!'
  },

  githubChecks: async (_parent, args, _ctx) => {
    return GithubCheck.find(args as FindConditions<GithubCheck>)
  },

  githubCheck: async (_parent, args, _ctx) => {
    const { repoName, repoOwner, commitSha } = args
    return GithubCheck.findOne({ repoName, repoOwner, commitSha })
  },

  currentUser: (_parent, _args, ctx) => {
    return ctx.user
  },
} as QueryResolvers.Resolvers<Context>
