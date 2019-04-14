import { AuthenticationError, AuthorizationError } from 'api/exceptions'
import { Context } from 'api/graphql/Context'
import { error, success } from 'api/graphql/resolvers/lib/MutationResponse'
import {
  CreateCliAuthSessionResponse,
  CreateComponentResponse,
  CreateRenderResponse,
  CreateSampleResponse,
  CreateTeamResponse,
  MutationResolvers,
} from 'api/graphql/types'
import { defaultExpiresAt } from 'api/lib/cliAuth'
import { userInTeam } from 'api/lib/user'
import { prisma } from 'api/prisma'
import { LogoutResponse } from 'ui/lib/graphql'

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

  async createSample(_parent, { input }, ctx): Promise<CreateSampleResponse> {
    const { componentId, name } = input
    if (!ctx.user) {
      throw new AuthenticationError()
    }

    const component = await prisma.component({ id: componentId })
    const team = await prisma.component({ id: componentId }).team()

    if (!(await userInTeam(ctx.user, team))) {
      throw new AuthorizationError()
    }

    const sample = await prisma.createSample({
      name,
      component: {
        connect: {
          id: component.id,
        },
      },
    })

    return success({ sample })
  },

  async createRender(_parent, { input }, ctx): Promise<CreateRenderResponse> {
    const { componentName, sampleName, html, imageUrl, branch, commit } = input
    const { user, team } = ctx

    if (!user || !team) {
      throw new AuthenticationError()
    }

    let component
    const components = await prisma.team({ id: team.id }).components({
      where: {
        name: componentName,
      },
    })
    if (components.length === 0) {
      component = await prisma.createComponent({
        name: componentName,
        team: {
          connect: {
            id: team.id,
          },
        },
      })
    } else if (components.length > 1) {
      throw new Error(
        `Multiple components found for team ${
          team.name
        } with name ${componentName}. 1 expected.`,
      )
    } else {
      component = components[0]
    }

    let sample
    const samples = await prisma.component({ id: component.id }).samples({
      where: {
        name: sampleName,
      },
    })
    if (samples.length === 0) {
      sample = await prisma.createSample({
        name: sampleName,
        component: {
          connect: {
            id: component.id,
          },
        },
      })
    } else if (samples.length > 1) {
      throw new Error(
        `Multiple samples found for team ${
          team.name
        } & component ${componentName} with name ${sampleName}. 1 expected.`,
      )
    } else {
      sample = samples[0]
    }

    const render = await prisma.createRender({
      html,
      imageUrl: imageUrl ? imageUrl : undefined,
      branch,
      commit,
      sample: {
        connect: {
          id: sample.id,
        },
      },
    })

    return success({ render })
  },

  async createCliAuthSession(): Promise<CreateCliAuthSessionResponse> {
    let cliAuthSession
    try {
      cliAuthSession = await prisma.createCliAuthSession({
        expiresAt: defaultExpiresAt(),
      })
    } catch (e) {
      console.error(e)
      return error('Unable to create CliAuthSession')
    }
    return success({ cliAuthSession })
  },
} as MutationResolvers<Context>
