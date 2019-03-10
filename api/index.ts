import { GraphQLServer } from 'graphql-yoga'

import resolvers from 'api/resolvers'
import config from 'api/config'
import { getContext } from 'api/context'

export default new GraphQLServer({
  typeDefs: config.graphqlSchemaPath,
  resolvers,
  context: getContext,
})
