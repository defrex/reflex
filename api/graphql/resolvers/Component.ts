import { Context } from 'api/graphql/Context'
import { ComponentResolvers } from 'api/graphql/types'
import { prisma } from 'api/prisma'
import { AuthenticationError, AuthorizationError } from 'api/exceptions'
import { userInTeam } from 'api/lib/user'

export default {
  examples: async (component, _args, ctx) => {
    if (!ctx.user) {
      throw new AuthenticationError()
    }

    const team = await prisma.component({ id: component.id }).team()
    if (!(await userInTeam(ctx.user, team))) {
      throw new AuthorizationError()
    }

    return await prisma.component({ id: component.id }).examples()
  },
} as ComponentResolvers<Context>
