import { GraphQLServer } from 'graphql-yoga'

import resolvers from 'api/resolvers'
import config from 'config'

import './db'

export default new GraphQLServer({
  typeDefs: config.graphqlSchemaPath,
  resolvers,
  context: async (_req, _res) => {
    return {}
  },
})
