import React from 'react'
import fs from 'fs'
import express from 'express'
import ReactDOMServer from 'react-dom/server'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import { Application, Request, Response } from 'express'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { SchemaLink } from 'apollo-link-schema'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { StaticRouter } from 'react-router-dom'
import { getStyles } from 'typestyle'
import { renderToStringWithData } from 'react-apollo'

import App from 'ui/App'
import webpackConfig from '../webpack.config'
import Document, { Script } from 'ui/Document'
import config from 'api/config'
import { absolutePath } from 'api/lib/path'

const statsFilename = absolutePath('dist/stats.json')
const statsFile = fs.existsSync(statsFilename)
  ? JSON.parse(fs.readFileSync(statsFilename, 'utf-8'))
  : null

interface RouterContext {
  url?: string
  status?: number
}

export default async function applyUiMiddleware(app: Application) {
  if (config.environment === 'development') {
    const compiler = webpack(webpackConfig)
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: '/dist',
        stats: 'minimal',
        serverSideRender: true,
      }),
    )

    app.use(webpackHotMiddleware(compiler))
  } else {
    app.get('/dist', express.static('dist'))
  }

  app.get('*', async (req: Request, res: Response) => {
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
    const scripts: Script[] = [
      {
        content: `window.__APOLLO_STATE__=${JSON.stringify(apollo.extract())};`,
      },
    ]

    let stats
    if (config.environment === 'development') {
      stats = res.locals.webpackStats.toJson()
    } else {
      stats = statsFile
    }
    scripts.concat(
      Object.values(stats.assetsByChunkName).map((asset: any) => ({
        src: `/dist/${asset}`,
      })),
    )

    res.send(
      ReactDOMServer.renderToStaticMarkup(
        <Document html={html} css={css} scripts={scripts} />,
      ),
    )
    res.end()
  })
}
