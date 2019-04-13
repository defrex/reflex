import { Context } from 'api/graphql/Context'
import CliAuthSession from 'api/graphql/resolvers/CliAuthSession'
import Component from 'api/graphql/resolvers/Component'
import Example from 'api/graphql/resolvers/Example'
import Mutation from 'api/graphql/resolvers/Mutation'
import Query from 'api/graphql/resolvers/Query'
import Team from 'api/graphql/resolvers/Team'
import User from 'api/graphql/resolvers/User'
import { Resolvers } from 'api/graphql/types'

export default {
  Query,
  Mutation,
  User,
  Team,
  Component,
  Example,
  CliAuthSession,
} as Resolvers<Context>
