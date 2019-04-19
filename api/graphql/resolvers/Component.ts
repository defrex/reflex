import { AuthenticationError, AuthorizationError } from 'api/exceptions'
import { Context } from 'api/graphql/Context'
import { ComponentResolvers } from 'api/graphql/types'
import { userInTeam } from 'api/lib/user'
import { prisma } from 'api/prisma'

export default {
  samples: async (component, _args, ctx) => {
    if (!ctx.user) {
      throw new AuthenticationError()
    }

    const team = await prisma.component({ id: component.id }).team()
    if (!(await userInTeam(ctx.user, team))) {
      throw new AuthorizationError()
    }

    return await prisma.component({ id: component.id }).samples()
  },
} as ComponentResolvers<Context>
