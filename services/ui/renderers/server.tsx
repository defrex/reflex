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

export default ({ clientStats }: { clientStats: any }) =>
  async function uiServer(req: Request, res: Response, _next: NextFunction) {
    console.log(`POST ${process.env.API_URL}/graphql`)
    console.log(JSON.stringify({ query: 'query {hello}' }))
    const test = await fetch(`${process.env.API_URL}/graphql`, {
      method: 'POST',
      body: JSON.stringify({ query: 'query {hello}' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (test.status !== 200) {
      console.error('❌', test.status)
    } else {
      console.log('✅')
    }

    // @ts-ignore
    const fatch: GlobalFetch['fetch'] = async (uri, options) => {
      console.log('fetching')
      console.log('method:', options!.method)
      console.log('uri:', uri)
      const resp = await fetch(uri as any, options as any)
      console.log('status:', resp.status)
      // console.log('json:', resp.json())
      return resp
    }

    const apollo = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: `${process.env.API_URL}/graphql`,
        fetch: fatch,
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
