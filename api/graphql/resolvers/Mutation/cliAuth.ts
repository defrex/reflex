import { AuthenticationError } from 'api/exceptions'
import { authUrl } from 'api/github/auth'
import { Context } from 'api/graphql/Context'
import { CheckCliAuthResponse, MutationResolvers } from 'api/graphql/types'
import { tokenForUser } from 'api/lib/auth'
import { checkCliAuthSession, startCliAuthSession } from 'api/lib/cliAuth'
import { prisma } from 'api/prisma'
import { BeginCliAuthResponse } from 'ui/lib/graphql'

export default {
  async beginCliAuth(_parent, _args, _ctx): Promise<BeginCliAuthResponse> {
    const cliAuthToken = await startCliAuthSession()

    const url = new URL(authUrl)
    url.searchParams.set('cliAuthToken', cliAuthToken)
    return { cliAuthToken, url: url.toString() }
  },

  async checkCliAuth(_parent, args, _ctx): Promise<CheckCliAuthResponse> {
    const cliAuthSession = await checkCliAuthSession(args.cliAuthToken)
    if (!cliAuthSession) {
      throw new AuthenticationError()
    }
    const authenticatedUser = await prisma
      .cliAuthSession({ id: cliAuthSession.id })
      .authenticatedUser()
    return {
      userAuthToken: authenticatedUser ? tokenForUser(authenticatedUser) : null,
    }
  },
} as MutationResolvers<Context>
