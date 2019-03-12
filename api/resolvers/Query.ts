import { QueryResolvers } from 'gen/resolvers'
import GithubCheck from 'api/models/GithubCheck'
import Context from 'api/context'
import { FindConditions } from 'typeorm'

export default {
  hello: (_parent, _args, _ctx) => {
    return 'Hello!'
  },

  githubChecks: async (_parent, args, _ctx): Promise<GithubCheck[]> => {
    return GithubCheck.find(args as FindConditions<GithubCheck>)
  },

  githubCheck: async (_parent, args, _ctx): Promise<GithubCheck | undefined> => {
    const { repoName, repoOwner, commitSha } = args
    return GithubCheck.findOne({ repoName, repoOwner, commitSha })
  },
} as QueryResolvers.Resolvers<Context>
