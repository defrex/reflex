import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Request, Response, NextFunction } from 'express'
import { SchemaLink } from 'apollo-link-schema'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { StaticRouter } from 'react-router-dom'
import { getStyles } from 'typestyle'
import { renderToStringWithData } from 'react-apollo'

import App from 'ui/App'
import Document, { Script } from 'ui/Document'

interface RouterContext {
  url?: string
  status?: number
}

export default ({ clientStats }: { clientStats: any }) =>
  async function uiServer(req: Request, res: Response, _next: NextFunction) {
    const apollo = new ApolloClient({
      ssrMode: true,
      link: new SchemaLink({
        schema: res.locals.graphqlSchema,
        context: res.locals.graphqlContext,
      }),
      cache: new InMemoryCache(),
    })

    const routerContext: RouterContext = {}
    const html = await renderToStringWithData(
      <StaticRouter location={req.url} context={routerContext}>
        <App apollo={apollo} />
      </StaticRouter>,
    )

    if (routerContext.status) {
      res.status(routerContext.status)
    }

    if (routerContext.url) {
      res.redirect(routerContext.url)
      return
    }

    const css = getStyles()

    const apolloState = {
      content: `window.__APOLLO_STATE__=${JSON.stringify(apollo.extract())};`,
    }
    const assets = Object.values(clientStats.assetsByChunkName).map(
      (asset: any) => {
        if (typeof asset !== 'string') {
          asset = asset[0] // Skip maps
        }
        return { src: `/dist/${asset}` }
      },
    )
    const scripts: Script[] = [apolloState, ...assets]

    res.send(
      ReactDOMServer.renderToStaticMarkup(
        <Document html={html} css={css} scripts={scripts} />,
      ),
    )
    res.end()
  }
