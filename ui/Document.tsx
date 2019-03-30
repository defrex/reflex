import React, { PureComponent } from 'react'
import { SchemaLink } from 'apollo-link-schema'
import { GraphQLSchema } from 'graphql'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'

import { Context } from 'api/graphql/Context'
import { primary } from 'ui/lib/colors'
import App from 'ui/App'

interface DocumentProps {
  assets: string[]
  graphqlSchema: GraphQLSchema
  graphqlContext: Context
}

export default class Document extends PureComponent<DocumentProps> {
  private apollo: ApolloClient<NormalizedCacheObject>

  constructor(props: DocumentProps) {
    super(props)

    const { graphqlSchema, graphqlContext } = props
    this.apollo = new ApolloClient({
      ssrMode: true,
      link: new SchemaLink({
        schema: graphqlSchema,
        context: graphqlContext,
      }),
      cache: new InMemoryCache(),
    })
  }

  render() {
    const { assets } = this.props
    return (
      <html lang='en-US'>
        <head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content={primary} />
          <link rel='manifest' href='/static/manifest.json' />
          <link
            href='https://fonts.googleapis.com/css?family=Source+Sans+Pro'
            rel='stylesheet'
          />
        </head>
        <body>
          <div id='app'>
            <App apollo={this.apollo} />
          </div>
          {assets.map((asset) => (
            <script src={asset} />
          ))}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__ = ${JSON.stringify(
                this.apollo.extract(),
              )};`,
            }}
          />
        </body>
      </html>
    )
  }
}
