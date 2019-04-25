import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { NextFunction, Request, Response } from 'express'
import fetch from 'node-fetch'
import React from 'react'
import { renderToStringWithData } from 'react-apollo'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { getStyles } from 'typestyle'
import App from 'ui/App'
import Document, { Script } from 'ui/Document'
import { RouterContext } from 'ui/types/RouterContext'

console.log('ℹAPI_ENDPOINT', process.env.API_ENDPOINT)

export default ({ clientStats }: { clientStats: any }) =>
  async function uiServer(req: Request, res: Response, _next: NextFunction) {
    const apollo = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: process.env.API_ENDPOINT,
        fetch: fetch as any,
        headers: req.headers,
      }),
      cache: new InMemoryCache(),
    })

    const routerContext: RouterContext = {}
    const html = await renderToStringWithData(
      <StaticRouter location={req.url} context={routerContext}>
        <App apollo={apollo} />
      </StaticRouter>,
    )

    if (routerContext.statusCode) {
      res.status(routerContext.statusCode)
    }

    if (routerContext.redirectUrl) {
      res.redirect(routerContext.redirectUrl)
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
