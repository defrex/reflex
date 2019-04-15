import { AuthenticationError, AuthorizationError } from 'api/exceptions'
import { Context } from 'api/graphql/Context'
import { TeamResolvers } from 'api/graphql/types'
import { userInTeam } from 'api/lib/user'
import { prisma } from 'api/prisma'

export default {
  role: async (team, _args, ctx) => {
    if (!ctx.user) {
      throw new AuthenticationError()
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

  components: async (team, _args, ctx) => {
    if (!ctx.user) {
      throw new AuthenticationError()
    }

    if (!(await userInTeam(ctx.user, team))) {
      throw new AuthorizationError()
    }

    return prisma.team({ id: team.id }).components()
  },

  component: async (team, args, ctx) => {
    const { id } = args
    if (!ctx.user) {
      throw new AuthenticationError()
    }

    if (!(await userInTeam(ctx.user, team))) {
      throw new AuthorizationError()
    }

    const components = await prisma
      .team({ id: team.id })
      .components({ where: { id } })

    return components.pop()
  },
} as TeamResolvers<Context>
