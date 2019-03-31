import React from 'react'
import ReactDOMServer from 'react-dom/server'
// import fs from 'fs'
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
    const scripts: Script[] = Object.values(clientStats.assetsByChunkName).map(
      (asset: any) => ({
        src: `/dist/${asset}`,
      }),
    )

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

    scripts.push({
      content: `window.__APOLLO_STATE__=${JSON.stringify(apollo.extract())};`,
    })

    res.send(
      ReactDOMServer.renderToStaticMarkup(
        <Document html={html} css={css} scripts={scripts} />,
      ),
    )
    res.end()
  }
