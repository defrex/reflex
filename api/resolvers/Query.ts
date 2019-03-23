import { FindConditions } from 'typeorm'

import { QueryResolvers } from 'api/graphqlTypes'
import GithubCheck from 'api/models/GithubCheck'
import { authUrl as githubAuthUrl } from 'api/github/auth'
import { authUrl as figmaAuthUrl } from 'api/figma/auth'
import { Context } from 'api/Context'
import Organization from 'api/models/Organization'

export default {
  hello: (_parent, _args, _ctx) => {
    return 'Hello!'
  },

  currentUser: (_parent, _args, ctx) => {
    return ctx.user
  },

  githubChecks: async (_parent, args, _ctx) => {
    return GithubCheck.find(args as FindConditions<GithubCheck>)
  },

  githubCheck: async (_parent, args, _ctx) => {
    return GithubCheck.findOne(args)
  },

  organization: async (_parent, args, _ctx) => {
    return Organization.findOne(args)
  },

  organizations: async (_parent, _args, ctx) => {
    if (!ctx.user) {
      return []
    }
    return Organization.find({
      relations: ['memberships'],
      where: {
        memberships: {
          userId: ctx.user.id,
        },
      },
    })
  },

  config: (_parent, _args, _ctx) => {
    return {
      figmaAuthUrl,
      githubAuthUrl,
    }
  },
} as QueryResolvers<Context>
