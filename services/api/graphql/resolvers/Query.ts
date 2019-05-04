import { AuthorizationError } from 'api/exceptions'
import { authUrl as figmaAuthUrl } from 'api/figma/auth'
import { authUrl as githubAuthUrl } from 'api/github/auth'
import { Context } from 'api/graphql/Context'
import { QueryResolvers } from 'api/graphql/types'
import { authSessionForToken } from 'api/lib/cliAuth'
import { userInTeam } from 'api/lib/user'
import { CliAuthSession, prisma, Team } from 'api/prisma'

export default {
  hello(_parent, _args, _ctx) {
    return 'Hello!'
  },

  config(_parent, _args, _ctx) {
    return {
      figmaAuthUrl,
      githubAuthUrl,
    }
  },

  currentUser(_parent, _args, ctx) {
    return ctx.user
  },

  async team(_parent, args, _ctx) {
    return prisma.team(args)
  },

  async teams(_parent, _args, ctx) {
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

  async cliAuthSession(_parent, args): Promise<CliAuthSession | void> {
    return authSessionForToken(args.cliAuthToken)
  },

  async check(_parent, args, ctx) {
    const { id } = args
    const { user } = ctx
    if (!user) {
      throw new AuthorizationError('No User')
    }

    const team = await prisma
      .check({ id })
      .repo()
      .team()
    if (!userInTeam(user, team)) {
      throw new AuthorizationError('User not in Team')
    }

    return prisma.check({ id })
  },
} as QueryResolvers<Context>
