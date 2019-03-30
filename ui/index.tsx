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

  app.get('*', async (_req: Request, res: Response) => {
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
        <Document
          assets={assets}
          graphqlContext={res.locals.graphqlContext}
          graphqlSchema={res.locals.graphqlSchema}
        />,
      ),
    )
    res.end()
  })
}

// import Loadable from 'react-loadable'
// import { getBundles } from 'react-loadable/webpack'
// import stats from '../build/react-loadable.json'

// app.get('/', (req, res) => {
//   let modules = []

//   let html = ReactDOMServer.renderToString(
//     <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
//       <App />
//     </Loadable.Capture>,
//   )

//   let bundles = getBundles(stats, modules)

//   res.send(`
//   <!doctype html>
//   <html lang="en">
//     <head>...</head>
//     <body>
//       <div id="app">${html}</div>
//       <script src="/dist/manifest.js"></script>
//       ${bundles.map(bundle => {
//         return `<script src="/dist/${bundle.file}"></script>`
//         // alternatively if you are using publicPath option in webpack config
//         // you can use the publicPath value from bundle, e.g:
//         // return `<script src="${bundle.publicPath}"></script>`
//       }).join('\n')}
//       <script src="/dist/main.js"></script>
//     </body>
//   </html>
// `);
//   // ...
// })
