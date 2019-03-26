import { prisma, Team } from 'api/prisma'
import { QueryResolvers } from 'api/graphql/types'
import { authUrl as githubAuthUrl } from 'api/github/auth'
import { authUrl as figmaAuthUrl } from 'api/figma/auth'
import { Context } from 'api/graphql/Context'
import { absoluteUrl } from 'api/lib/url'

export default {
  hello: (_parent, _args, _ctx) => {
    return 'Hello!'
  },

  config: (_parent, _args, _ctx) => {
    return {
      figmaAuthUrl,
      githubAuthUrl,
      logoutUrl: absoluteUrl('/api/logout'),
    }
  },

  currentUser: (_parent, _args, ctx) => {
    return ctx.user
  },

  team: async (_parent, args, _ctx) => {
    return prisma.team(args)
  },

  teams: async (_parent, _args, ctx) => {
    if (!ctx.user) {
      return []
    }
    const memberships = await prisma.memberships({ where: { user: ctx.user } })
    const teams: Team[] = []
    for (const membership of memberships) {
      teams.push(await prisma.membership({ id: membership.id }).team())
    }
    return teams
  },
} as QueryResolvers<Context>
