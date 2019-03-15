import withApollo from 'next-with-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { SchemaLink } from 'apollo-link-schema'

import config from 'ui/config'
import { absoluteUrl } from 'ui/lib/url'

if (!config.domain) {
  throw new Error('No domain set')
}

export default withApollo(({ ctx, initialState }) => {
  let link: ApolloLink

  if (!process.browser && ctx && ctx.req) {
    // TODO: solve this type issue
    link = new SchemaLink({
      // @ts-ignore
      schema: ctx.req.api.executableSchema,
      // @ts-ignore
      context: ctx.req.api.context,
    })
  } else {
    link = ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
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
