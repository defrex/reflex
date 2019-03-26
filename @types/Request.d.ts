/// <reference types="express" />

import { GraphQLSchema } from 'graphql'
import Context from 'api/graphql/Context'
import { User } from 'api/prisma'

declare global {
  namespace Express {
    interface Request {
      graphqlSchema?: GraphQLSchema
      graphqlContext?: Context
      user?: User
    }
  }
}
