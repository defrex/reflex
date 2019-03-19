import { QueryResolvers } from 'api/gen'
import GithubCheck from 'api/models/GithubCheck'
import { FindConditions } from 'typeorm'

import { authUrl } from 'api/github/auth'

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

  config: (_parent, _args, _ctx) => {
    return {
      loginUrl: authUrl,
      signupUrl: authUrl,
    }
  },
} as QueryResolvers.Resolvers
