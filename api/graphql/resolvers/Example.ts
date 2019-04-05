import { Context } from 'api/graphql/Context'
import { ExampleResolvers } from 'api/graphql/types'
import { prisma } from 'api/prisma'
import { AuthenticationError, AuthorizationError } from 'api/exceptions'
import { userInTeam } from 'api/lib/user'

export default {
  renders: async (example, _args, ctx) => {
    if (!ctx.user) {
      throw new AuthenticationError()
    }

    const team = await prisma
      .example({ id: example.id })
      .component()
      .team()
    if (!(await userInTeam(ctx.user, team))) {
      throw new AuthorizationError()
    }

    return await prisma.example({ id: example.id }).renders()
  },
} as ExampleResolvers<Context>
