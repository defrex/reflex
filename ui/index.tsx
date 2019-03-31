import React from 'react'
import fs from 'fs'
import ReactDOMServer from 'react-dom/server'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import { Application, Request, Response } from 'express'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from '../webpack/ui'
import Document from 'ui/Document'
import config from 'api/config'
import { absolutePath } from 'api/lib/path'

const statsFilename = absolutePath('public/dist/stats.json')
const statsFile = fs.existsSync(statsFilename)
  ? JSON.parse(fs.readFileSync(statsFilename, 'utf-8'))
  : null

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
  }

  app.get('*', async (req: Request, res: Response) => {
    let stats
    if (config.environment === 'development') {
      stats = res.locals.webpackStats.toJson()
    } else {
      stats = statsFile
    }
    const assets = Object.values(stats.assetsByChunkName).map(
      (asset: any) => `/dist/${asset}`,
    )
    res.send(
      ReactDOMServer.renderToString(
        <Document assets={assets} req={req} res={res} />,
      ),
    )
    res.end()
  })
}
