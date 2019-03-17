import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import withApollo from 'ui/lib/withApollo'

interface ReflexAppProps {
  apollo: ApolloClient<InMemoryCache>
}

class ReflexApp extends App<App['props'] & ReflexAppProps> {
  render () {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(ReflexApp)