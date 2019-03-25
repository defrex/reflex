import User from 'api/models/User'
import { loggedInUser } from 'api/lib/auth'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'

export type Context = {
  user?: User
  logout: () => void
}

export async function getContext({ req }: ExpressContext): Promise<Context> {
  const user = await loggedInUser(req)
  return {
    user,
    logout: () => {
      console.log('TODO: 🚪 fix logout')
      // @ts-ignore
      req.session = null
      // TODO: this isn't working
    },
  }
}
