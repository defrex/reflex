import { Application, Request, Response, NextFunction } from 'express'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { importSchema } from 'graphql-import'

import resolvers from 'api/resolvers'
import config from 'api/config'
import { getContext } from 'api/Context'

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

  app.use(async (req: Request, _res: Response, next: NextFunction) => {
    req.graphqlSchema = schema
    req.graphqlContext = await getContext(req)
    next()
  })

  graphqlServer.applyMiddleware({ app, path: config.graphqlEndpoint })
}
