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
import config from 'api/config'
// import { absolutePath } from 'api/lib/path'

interface RouterContext {
  url?: string
  status?: number
}

export default () =>
  async function uiServer(req: Request, res: Response, _next: NextFunction) {
    // console.log(clientStats, serverStats)

    let stats
    if (config.environment === 'development') {
      stats = res.locals.webpackStats.toJson()
    } else {
      stats = {}
      // require(absolutePath('dist/browser-stats.json'))
    }
    const scripts: Script[] = Object.values(stats.assetsByChunkName).map(
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
