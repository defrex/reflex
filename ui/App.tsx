/// <reference types="../@types/svgs" />
import React, { PureComponent } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

import Dashboard from 'ui/pages/dashboard'

interface ReflexAppProps {
  apollo: ApolloClient<NormalizedCacheObject>
}

export default class ReflexApp extends PureComponent<ReflexAppProps> {
  render() {
    const { apollo } = this.props

    return (
      <ApolloProvider client={apollo}>
        <Dashboard />
      </ApolloProvider>
    )
  }
}
