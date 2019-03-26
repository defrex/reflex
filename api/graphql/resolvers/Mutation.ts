import { prisma } from 'api/prisma'
import { MutationResolvers, CreateTeamResponse } from 'api/graphql/types'
import { Context } from 'api/graphql/Context'
import { LogoutResponse } from 'ui/lib/graphql'
import { success, error } from 'api/graphql/resolvers/lib/MutationResponse'

export default {
  async logout(_parent, _args, ctx): Promise<LogoutResponse> {
    ctx.logout()
    return success()
  },

  async createTeam(_parent, args, ctx): Promise<CreateTeamResponse> {
    if (!ctx.user) {
      return error('You must be logged in to create an Team')
    }

    const membership = await prisma.createMembership({
      role: 'ADMIN',
      user: {
        connect: {
          id: ctx.user.id,
        },
      },
      team: {
        create: args.input,
      },
    })

    return success({ team: prisma.membership({ id: membership.id }).team() })
  },
} as MutationResolvers<Context>
