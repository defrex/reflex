import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
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
    // @ts-ignore
    const fatch: GlobalFetch['fetch'] = async (uri, options) => {
      console.log('fetching', options!.method, uri)
      const resp = await fetch(uri as any, options as any)
      console.log('status:', resp.status)
      return resp
    }

    const apollo = new ApolloClient({
      ssrMode: true,
      link: ApolloLink.from([
        onError(({ networkError, graphQLErrors }) => {
          if (graphQLErrors) {
            graphQLErrors.map(({ message }) => {
              if (
                message.includes('AUTHENTICATION_ERROR') ||
                message.includes('AUTHORIZATION_ERROR')
              ) {
                console.log(`[Auth error]: ${message}`)
              } else {
                res.sendStatus(400)
                console.log(`[GraphQL error]: ${message}`)
              }
            })
          }
          if (networkError) console.log(`[Network error]: ${networkError}`)
        }),
        createHttpLink({
          uri: `${process.env.API_URL}/graphql`,
          fetch: fatch,
          headers: {
            Authorization: req.cookies.Authorization,
          },
        }),
      ]),
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
