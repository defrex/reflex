/// <reference path="../types/Request.d.ts" />
import config from 'api/config'
import { getContext } from 'api/graphql/Context'
import resolvers from 'api/graphql/resolvers'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { Application } from 'express'
import { importSchema } from 'graphql-import'

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
    playground: {
      settings: {
        'general.betaUpdates': false,
        'editor.cursorShape': 'line',
        'editor.fontSize': 14,
        'editor.fontFamily':
          "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
        'editor.theme': 'dark',
        'editor.reuseHeaders': true,
        'prettier.printWidth': 80,
        'request.credentials': 'same-origin',
        'tracing.hideTracingResponse': true,
      },
    },
    formatError: (error) => {
      console.error(error)
      return error
    },
  })

  graphqlServer.applyMiddleware({
    app,
    path: config.graphqlEndpoint,
    cors: false,
  })
}
