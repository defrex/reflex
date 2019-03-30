import React, { FunctionComponentElement } from 'react'
import ReactDOM, { Renderer } from 'react-dom'
// import Loadable from 'react-loadable'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
// import { Global } from '@emotion/core'

// import globalStyles from 'ui/lib/globalStyles'
import { absoluteUrl } from 'ui/lib/url'
import App from 'ui/App'

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
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
      uri: absoluteUrl('/api/graphql'),
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__ || {}),
})

async function render(
  renderFunction: Renderer,
  App: FunctionComponentElement<any>,
) {
  // await Loadable.preloadReady()

  const reactRoot = document.getElementById('app')

  renderFunction(App, reactRoot)
}

render(ReactDOM.hydrate, <App apollo={apolloClient} />)

// if (process.env.NODE_ENV === 'development' && module.hot && module.hot.accept) {
//   module.hot.accept('ui/App', () => {
//     render(ReactDOM.render, require('ui/App').default)
//   })
// }
