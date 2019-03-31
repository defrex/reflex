import React from 'react'
import ReactDOM, { Renderer } from 'react-dom'
import { setStylesTarget } from 'typestyle'
import { BrowserRouter } from 'react-router-dom'
// import Loadable from 'react-loadable'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

import { absoluteUrl } from 'ui/lib/url'
import ReflexApp from 'ui/App'

const styles = document.getElementById('styles')
if (styles) setStylesTarget(styles)

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

async function render(renderFunction: Renderer, App: typeof ReflexApp) {
  // await Loadable.preloadReady()
  const element = document.getElementById('app')
  const app = (
    <BrowserRouter>
      <App apollo={apolloClient} />
    </BrowserRouter>
  )
  renderFunction(app, element)
}

render(ReactDOM.hydrate, ReflexApp)

if (module.hot && module.hot.accept) {
  module.hot.accept('ui/App', () => {
    const ReflexApp = require('ui/App').default
    render(ReactDOM.render, ReflexApp)
  })
}
