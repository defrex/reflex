import React, { PureComponent } from 'react'
import ReactDOMServer from 'react-dom/server'
import { SchemaLink } from 'apollo-link-schema'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { StaticRouter } from 'react-router-dom'

import { primary } from 'ui/lib/colors'
import App from 'ui/App'
import { getStyles } from 'typestyle'
import { Request, Response } from 'express'

interface DocumentProps {
  assets: string[]
  req: Request
  res: Response
}

interface RouterContext {
  url?: string
  status?: number
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

    const { res } = props
    this.apollo = new ApolloClient({
      ssrMode: true,
      link: new SchemaLink({
        schema: res.locals.graphqlSchema,
        context: res.locals.graphqlContext,
      }),
      cache: new InMemoryCache(),
    })
  }

  renderApp = () => {
    const { req, res } = this.props

    const routerContext: RouterContext = {}
    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={routerContext}>
        <App apollo={this.apollo} />
      </StaticRouter>,
    )
    const css = getStyles()

    if (routerContext.status) {
      res.status(routerContext.status)
    }

    if (routerContext.url) {
      res.redirect(routerContext.url)
    }

    return { html, css }
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
