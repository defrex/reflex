import { GraphQLSchema } from 'graphql'
import Context from 'api/graphql/Context'
import { User } from 'api/prisma'

declare global {
  interface Window {
    __APOLLO_STATE__: any
  }
}
