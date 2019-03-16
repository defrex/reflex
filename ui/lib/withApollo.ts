import withApollo from 'next-with-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { SchemaLink } from 'apollo-link-schema'
import { IncomingMessage } from 'http'

import config from 'ui/config'
import { absoluteUrl } from 'ui/lib/url'

if (!config.domain) {
  throw new Error('No domain set')
}

interface GraphSchemaRequest extends IncomingMessage {
  graphqlSchema?: any
  graphqlContext?: any
}

export default withApollo(({ ctx, initialState }) => {
  let link: ApolloLink

  if (!process.browser && ctx && ctx.req) {
    const req: GraphSchemaRequest = ctx.req
    link = new SchemaLink({
      schema: req.graphqlSchema,
      context: req.graphqlSchema,
    })
  } else {
    link = ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          )
        }
        if (networkError) console.log(`[Network error]: ${networkError}`)
      }),
      new HttpLink({
        uri: absoluteUrl(config.graphqlEndpoint),
        credentials: 'same-origin',
      }),
    ])
  }

  return new ApolloClient({
    ssrMode: !process.browser,
    link,
    cache: new InMemoryCache().restore(initialState || {}),
  })
})
