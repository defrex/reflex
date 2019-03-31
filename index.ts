import express from 'express'
import cookieSession from 'cookie-session'
import chokidar from 'chokidar'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import morgan from 'morgan'

import gen from 'api/lib/gen'
import applyApiMiddleware from 'api'
import config from 'api/config'
import webpackConfigs from './webpack.config'
import { absoluteUrl } from 'api/lib/url'
import { absolutePath } from 'api/lib/path'

export default async function main() {
  const app = express()

  app.use(
    cookieSession({
      secret: config.secretKey,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
    }),
  )

  app.use(morgan('dev'))

  app.use(express.static('public'))

  await applyApiMiddleware(app)

  if (config.environment === 'development') {
    const compiler = webpack(webpackConfigs)
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: '/dist',
        stats: 'minimal',
        serverSideRender: true,
      }),
    )

    const clientCompiler = compiler.compilers.find(
      ({ name }) => name === 'client',
    )
    if (!clientCompiler) {
      throw new Error('Cannon find client compiler')
    }
    app.use(webpackHotMiddleware(clientCompiler))
    app.get('*', webpackHotServerMiddleware(compiler, { chunkName: 'server' }))
  } else {
    const stats = require(absolutePath('dist/server-stats.json'))
    const serverRendererPath = absolutePath(
      `/dist/${stats.assetsByChunkName.server}`,
    )
    console.log(serverRendererPath)
    const serverRenderer = require(serverRendererPath).default
    console.log(serverRenderer)

    app.get('/dist', express.static('dist'))
    app.get('*', serverRenderer(stats))
  }

  if (config.environment === 'development') {
    const files = [
      config.graphqlSchemaPath.replace('index', '*'),
      ...config.graphqlDocumentPaths,
    ]
    chokidar.watch(files, { ignoreInitial: true }).on('all', gen)
  }

  app.listen(config.port, () => {
    console.log(absoluteUrl('/'))
  })
}
