import { Resolvers } from 'api/graphql/types'
import { Context } from 'api/graphql/Context'
import Query from 'api/graphql/resolvers/Query'
import Mutation from 'api/graphql/resolvers/Mutation'
import User from 'api/graphql/resolvers/User'
import Team from 'api/graphql/resolvers/Team'

export default {
  Query,
  Mutation,
  User,
  Team,
} as Resolvers<Context>
