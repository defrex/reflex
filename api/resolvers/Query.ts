import { QueryResolvers } from 'gen/resolvers'
import GithubCheck from 'api/models/GithubCheck'
import Context from 'api/context'

export default {
  hello: (_parent, _args, _ctx) => {
    return 'Hello!'
  },

  githubChecks: async (_parent, _args, _ctx) => {
    return GithubCheck.find()
  },

  githubCheck: async (_parent, args, _ctx) => {
    const { repoName, repoOwner, commitSha } = args
    return GithubCheck.find({ repoName, repoOwner, commitSha })
  },
} as QueryResolvers.Resolvers<Context>
