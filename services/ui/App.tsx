/// <reference types="./types/svgs" />
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import React, { PureComponent } from 'react'
import { ApolloProvider } from 'react-apollo'
import 'ui/lib/globalStyles'
import Routes from 'ui/Routes'

interface ReflexAppProps {
  apollo: ApolloClient<NormalizedCacheObject>
}

export default class ReflexApp extends PureComponent<ReflexAppProps> {
  render() {
    const { apollo } = this.props

    return (
      <ApolloProvider client={apollo}>
        <Routes />
      </ApolloProvider>
    )
  }
}
