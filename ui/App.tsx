import React, { PureComponent } from 'react'
// import React, { PureComponent, ReactNode } from 'react'
// import { ApolloProvider } from 'react-apollo'
// import { ApolloClient } from 'apollo-client'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { Global } from '@emotion/core'

// import withApollo from 'ui/lib/withApollo'
// import globalStyles from 'ui/lib/globalStyles'

interface ReflexAppProps {
  // apollo: ApolloClient<InMemoryCache>
}

export default class ReflexApp extends PureComponent<ReflexAppProps> {
  render() {
    // const { apollo } = this.props

    return <div>Hello App</div>
    // return (
    //   <ApolloProvider client={apollo}>
    //     <Global styles={globalStyles} />
    //     <div/>
    //   </ApolloProvider>
    // )
  }
}

// export default withApollo(ReflexApp)
