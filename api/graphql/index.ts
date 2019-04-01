/// <reference path="../../@types/Request.d.ts" />
import { Application, Request, Response, NextFunction } from 'express'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { importSchema } from 'graphql-import'

import resolvers from 'api/graphql/resolvers'
import config from 'api/config'
import { getContext } from 'api/graphql/Context'

const typeDefs = importSchema(config.graphqlSchemaPath)

export default async (app: Application) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: resolvers as any,
  })

  const graphqlServer = new ApolloServer({
    schema,
    context: getContext,
  })

  app.use(async (req: Request, res: Response, next: NextFunction) => {
    res.locals.graphqlSchema = schema
    res.locals.graphqlContext = await getContext(req, res)
    next()
  })

  graphqlServer.applyMiddleware({
    app,
    path: config.graphqlEndpoint,
    cors: false,
  })
}
