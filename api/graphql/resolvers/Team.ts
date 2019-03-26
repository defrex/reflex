import { Context } from 'api/graphql/Context'
import { TeamResolvers } from 'api/graphql/types'
import { prisma } from 'api/prisma'

export default {
  role: async (team, _args, ctx) => {
    if (!ctx.user) {
      throw new Error('missing user in team resolver')
    }

    const memberships = await prisma
      .user({ id: ctx.user.id })
      .memberships({ where: { team: { id: team.id } } })

    if (memberships.length !== 1) {
      throw new Error(
        `unexpected number of memberships for user ${ctx.user.id} & team ${
          team.id
        }`,
      )
    }
    return memberships[0].role
  },
} as TeamResolvers<Context>
