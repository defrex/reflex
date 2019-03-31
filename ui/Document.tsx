import React, { PureComponent } from 'react'
import ReactDOMServer from 'react-dom/server'
import { SchemaLink } from 'apollo-link-schema'
import { GraphQLSchema } from 'graphql'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'

import { Context } from 'api/graphql/Context'
import { primary } from 'ui/lib/colors'
import App from 'ui/App'
import { getStyles } from 'typestyle'

interface DocumentProps {
  assets: string[]
  graphqlSchema: GraphQLSchema
  graphqlContext: Context
}

// import Loadable from 'react-loadable'
// import { getBundles } from 'react-loadable/webpack'
// import stats from '../build/react-loadable.json'

//   let modules = []

//   let html = ReactDOMServer.renderToString(
//     <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
//       <App />
//     </Loadable.Capture>,
//   )

//   let bundles = getBundles(stats, modules)

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

  renderApp = () => {
    return {
      html: ReactDOMServer.renderToString(<App apollo={this.apollo} />),
      css: getStyles(),
    }
  }

  render() {
    const { assets } = this.props
    const { html, css } = this.renderApp()
    return (
      <html lang='en-US'>
        <head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content={primary} />
          <link rel='manifest' href='/static/manifest.json' />
          <style id='styles'>{css}</style>
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{ __html: html }} />
          {assets.map((asset) => (
            <script src={asset} key={asset} />
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
