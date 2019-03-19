import { Application, Request, Response, NextFunction } from 'express'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { importSchema } from 'graphql-import'

import resolvers from 'api/resolvers'
import config from 'api/config'
import { getContext } from 'api/Context'

export default async (app: Application) => {
  const schema = makeExecutableSchema({
    typeDefs: importSchema(config.graphqlSchemaPath),
    resolvers,
  })

  const graphqlServer = new ApolloServer({
    schema: schema,
    context: getContext,
  })

  app.use(async (req: Request, _res: Response, skip: NextFunction) => {
    req.graphqlSchema = schema
    req.graphqlContext = await getContext(req)
    skip()
  })

  graphqlServer.applyMiddleware({ app, path: config.graphqlEndpoint })
}
