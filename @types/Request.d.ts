/// <reference types="express" />

import { GraphQLSchema } from 'graphql'
import Context from 'api/Context'
import User from 'api/models/User'

declare global {
  namespace Express {
    interface Request {
      graphqlSchema?: GraphQLSchema
      graphqlContext?: Context
      user?: User
    }
  }
}
