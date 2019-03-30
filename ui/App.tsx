import React, { PureComponent } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
// import { Global } from '@emotion/core'

// import globalStyles from 'ui/lib/globalStyles'

interface ReflexAppProps {
  apollo: ApolloClient<NormalizedCacheObject>
}

export default class ReflexApp extends PureComponent<ReflexAppProps> {
  render() {
    const { apollo } = this.props

    return (
      <ApolloProvider client={apollo}>
        {/* <Global styles={globalStyles} /> */}
        <div>Hello Apollo</div>
      </ApolloProvider>
    )
  }
}

// export default withApollo(ReflexApp)
