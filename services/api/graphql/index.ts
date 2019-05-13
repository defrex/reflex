/// <reference path="../types/Request.d.ts" />
import config from 'api/config'
import { getContext } from 'api/graphql/Context'
import resolvers from 'api/graphql/resolvers'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { Application } from 'express'
import { importSchema } from 'graphql-import'
import PrettyError from 'pretty-error'

const typeDefs = importSchema(config.graphqlSchemaPath)

export default async (app: Application) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: resolvers as any,
  })

  const graphqlServer = new ApolloServer({
    schema,
    context: getContext,
    introspection: true,
    playground: false,
    formatError: (error) => {
      if (config.environment === 'development') {
        console.log(new PrettyError().render(error))
      } else {
        console.log(error)
      }
      console.log(error.extensions!.exception)
      return error
    },
  })

  graphqlServer.applyMiddleware({
    app,
    path: config.graphqlEndpoint,
    cors: {
      origin: config.uiUrl,
      credentials: true,
    },
  })
}
