import { GraphQLServer } from 'graphql-yoga'

import resolvers from 'api/resolvers'
import config from 'api/config'
import { getContext } from 'api/context'

const graphqlServer = new GraphQLServer({
  typeDefs: config.graphqlSchemaPath,
  resolvers,
  context: getContext,
})

graphqlServer.options = {
  endpoint: config.graphqlEndpoint,
  playground: config.graphqlEndpoint,
  ...graphqlServer.options,
}

export default graphqlServer
