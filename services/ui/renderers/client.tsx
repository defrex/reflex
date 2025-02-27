import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import React from 'react'
import ReactDOM, { Renderer } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { setStylesTarget } from 'typestyle'
import ReflexApp from 'ui/App'
import { apiPath } from 'ui/lib/apiPath'

const styles = document.getElementById('styles')
if (styles) setStylesTarget(styles)

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: apiPath('/graphql'),
    credentials: 'include',
  }),
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
})

async function render(renderFunction: Renderer, App: typeof ReflexApp) {
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
