import { GraphQLServer } from 'graphql-yoga'
// import Auth from 'api/auth'

import resolvers from 'api/resolvers'
import config from 'config'

export default new GraphQLServer({
  typeDefs: config.graphqlSchemaPath,
  resolvers,
  context: async (request, response) => {
    return {
      // auth: new Auth(request, response),
    }
  },
})
