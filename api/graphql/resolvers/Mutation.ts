import { prisma } from 'api/prisma'
import {
  MutationResolvers,
  CreateTeamResponse,
  CreateComponentResponse,
  CreateExampleResponse,
} from 'api/graphql/types'
import { Context } from 'api/graphql/Context'
import { LogoutResponse } from 'ui/lib/graphql'
import { success } from 'api/graphql/resolvers/lib/MutationResponse'
import { userInTeam } from 'api/lib/user'
import { AuthenticationError, AuthorizationError } from 'api/exceptions'

export default {
  async logout(_parent, _args, ctx): Promise<LogoutResponse> {
    ctx.logout()
    return success()
  },

  async createTeam(_parent, args, ctx): Promise<CreateTeamResponse> {
    if (!ctx.user) {
      throw new AuthenticationError()
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

    const team = await prisma.membership({ id: membership.id }).team()
    return success({ team })
  },

  async createComponent(
    _parent,
    { input },
    ctx,
  ): Promise<CreateComponentResponse> {
    const { teamId, name } = input
    if (!ctx.user) {
      throw new AuthenticationError()
    }

    const team = await prisma.team({ id: teamId })

    if (!(await userInTeam(ctx.user, team))) {
      throw new AuthorizationError()
    }

    const component = await prisma.createComponent({
      name,
      team: {
        connect: {
          id: team.id,
        },
      },
    })

    return success({ component })
  },

  async createExample(_parent, { input }, ctx): Promise<CreateExampleResponse> {
    const { componentId, name } = input
    if (!ctx.user) {
      throw new AuthenticationError()
    }

    const component = await prisma.component({ id: componentId })
    const team = await prisma.component({ id: componentId }).team()

    if (!(await userInTeam(ctx.user, team))) {
      throw new AuthorizationError()
    }

    const example = await prisma.createExample({
      name,
      component: {
        connect: {
          id: component.id,
        },
      },
    })

    return success({ example })
  },
} as MutationResolvers<Context>
