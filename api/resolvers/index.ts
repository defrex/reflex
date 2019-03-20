import { IResolvers } from 'api/graphqlTypes'
import { Context } from 'api/Context'
import Query from 'api/resolvers/Query'
import Mutation from 'api/resolvers/Mutation'

export default {
  Query,
  Mutation,
} as IResolvers<Context>
