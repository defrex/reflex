import config from 'api/config'
import apiDevMiddleware from 'api/lib/apiDevMiddleware'
import gen from 'api/lib/gen'
import { absolutePath } from 'api/lib/path'
import run from 'api/lib/run'
import { absoluteUrl } from 'api/lib/url'
import chokidar from 'chokidar'
import express from 'express'
import { debounce } from 'lodash'
import morgan from 'morgan'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import webpackConfigs from './webpack.config'

interface InitOptions {
  ui: boolean
}

const defaultOptions = {
  ui: true,
}

export default async function main(options: InitOptions) {
  const { ui: enableUi } = { ...defaultOptions, ...options }
  const app = express()

  if (config.environment === 'development') {
    app.use(morgan('dev'))
  }

  app.use(express.static(absolutePath('public')))

  if (config.environment === 'development') {
    app.use(await apiDevMiddleware())
  } else {
    const applyApiMiddleware = require('api')
    await applyApiMiddleware(app)
  }

  if (enableUi) {
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
      app.get('/dist/*', (_req, res) => res.sendStatus(404))

      app.get(
        '*',
        webpackHotServerMiddleware(compiler, { chunkName: 'server' }),
      )
    } else {
      const serverStats = require(absolutePath('dist/server-stats.json'))
      const clientStats = require(absolutePath('public/dist/client-stats.json'))
      const serverRendererPath = absolutePath(
        `/dist/${serverStats.assetsByChunkName.server[0]}`,
      )
      const serverRenderer = require(serverRendererPath).default

      app.get('*', serverRenderer({ clientStats }))
    }
  }

  if (config.environment === 'development') {
    chokidar
      .watch(absolutePath('api/datamodel.prisma'), { ignoreInitial: true })
      .on('all', debounce(() => run(['prisma', 'generate']), 100))
    chokidar
      .watch(
        [
          config.graphqlSchemaPath.replace('index', '*'),
          ...config.graphqlDocumentPaths,
        ],
        { ignoreInitial: true },
      )
      .on('all', gen)
  }

  app.listen(config.port, () => {
    console.log(absoluteUrl('/'))
  })
}
