import React, { PureComponent } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

interface ReflexAppProps {
  apollo: ApolloClient<NormalizedCacheObject>
}

export default class ReflexApp extends PureComponent<ReflexAppProps> {
  render() {
    const { apollo } = this.props

    return (
      <ApolloProvider client={apollo}>
        <div>Hello Apollo</div>
      </ApolloProvider>
    )
  }
}
