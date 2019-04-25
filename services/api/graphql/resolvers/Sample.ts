import { AuthenticationError, AuthorizationError } from 'api/exceptions'
import { Context } from 'api/graphql/Context'
import { SampleResolvers } from 'api/graphql/types'
import { userInTeam } from 'api/lib/user'
import { prisma } from 'api/prisma'

export default {
  renders: async (sample, _args, ctx) => {
    if (!ctx.user) {
      throw new AuthenticationError()
    }

    const team = await prisma
      .sample({ id: sample.id })
      .component()
      .team()
    if (!(await userInTeam(ctx.user, team))) {
      throw new AuthorizationError()
    }

    return await prisma.sample({ id: sample.id }).renders()
  },
} as SampleResolvers<Context>
