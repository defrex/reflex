import { Context } from 'api/graphql/Context'
import Check from 'api/graphql/resolvers/Check'
import CliAuthSession from 'api/graphql/resolvers/CliAuthSession'
import Component from 'api/graphql/resolvers/Component'
import Mutation from 'api/graphql/resolvers/Mutation'
import Query from 'api/graphql/resolvers/Query'
import Sample from 'api/graphql/resolvers/Sample'
import Team from 'api/graphql/resolvers/Team'
import User from 'api/graphql/resolvers/User'
import { Resolvers } from 'api/graphql/types'

export default {
  Query,
  Mutation,
  User,
  Team,
  Component,
  Sample,
  CliAuthSession,
  Check,
} as Resolvers<Context>
