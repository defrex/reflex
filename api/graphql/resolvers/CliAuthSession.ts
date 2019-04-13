import { authUrl } from 'api/github/auth'
import { Context } from 'api/graphql/Context'
import { CliAuthSessionResolvers } from 'api/graphql/types'
import { tokenForUser } from 'api/lib/auth'
import { tokenForAuthSession } from 'api/lib/cliAuth'
import { CliAuthSession, prisma } from 'api/prisma'

export default {
  async cliAuthToken(cliAuthSession: CliAuthSession): Promise<string> {
    console.log('resolver CliAuthSession.cliAuthToken')
    return tokenForAuthSession(cliAuthSession)
  },

  async url(cliAuthSession): Promise<string> {
    console.log('resolver CliAuthSession.url')
    const token = await tokenForAuthSession(cliAuthSession)

    const url = new URL(authUrl)
    url.searchParams.set('cliAuthToken', token)
    return url.toString()
  },

  async userAuthToken(cliAuthSession): Promise<string | void> {
    console.log('resolver CliAuthSession.userAuthToken')
    const authenticatedUser = await prisma
      .cliAuthSession({ id: cliAuthSession.id })
      .authenticatedUser()
    if (authenticatedUser) {
      return tokenForUser(authenticatedUser)
    }
  },
} as CliAuthSessionResolvers<Context>
