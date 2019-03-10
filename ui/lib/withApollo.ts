import withApollo from 'next-with-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

import config from 'ui/config'
import { absoluteUrl } from 'ui/lib/url'

export default withApollo(({ initialState }) => (
  new ApolloClient({
    uri: absoluteUrl(config.graphqlEndpoint),
    cache: new InMemoryCache().restore(initialState || {}),
  })
))
