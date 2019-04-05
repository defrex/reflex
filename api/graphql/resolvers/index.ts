import { Resolvers } from 'api/graphql/types'
import { Context } from 'api/graphql/Context'
import Query from 'api/graphql/resolvers/Query'
import Mutation from 'api/graphql/resolvers/Mutation'
import User from 'api/graphql/resolvers/User'
import Team from 'api/graphql/resolvers/Team'
import Component from 'api/graphql/resolvers/Component'
import Example from 'api/graphql/resolvers/Example'

export default {
  Query,
  Mutation,
  User,
  Team,
  Component,
  Example,
} as Resolvers<Context>
