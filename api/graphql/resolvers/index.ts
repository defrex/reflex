import { IResolvers } from 'api/graphql/types'
import { Context } from 'api/graphql/Context'
import Query from 'api/graphql/resolvers/Query'
import Mutation from 'api/graphql/resolvers/Mutation'

export default {
  Query,
  Mutation,
} as IResolvers<Context>
