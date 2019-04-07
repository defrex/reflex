import applyApiMiddleware from 'api'
import config from 'api/config'
import gen from 'api/lib/gen'
import { absolutePath } from 'api/lib/path'
import run from 'api/lib/run'
import { absoluteUrl } from 'api/lib/url'
import chokidar from 'chokidar'
import cookieSession from 'cookie-session'
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

  app.use(
    cookieSession({
      secret: config.secretKey,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
    }),
  )
  app.use(morgan('dev'))
  app.use(express.static(absolutePath('public')))

  await applyApiMiddleware(app)

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
    // chokidar
    //   .watch([absolutePath('api/*.ts'), absolutePath('api/**/*.ts')], {
    //     ignoreInitial: true,
    //   })
    //   .on('all', async (_event, _path) => {
    //     console.log('reloading')
    //     const apiPath = absolutePath('api')
    //     for (const path of Object.keys(require.cache)) {
    //       if (path.startsWith(apiPath)) {
    //         delete require.cache[require.resolve(path)]
    //         require(path)
    //       }
    //     }
    //     const { default: applyApiMiddleware } = await import('./api')
    //     applyApiMiddleware(app)
    //   })
  }

  app.listen(config.port, () => {
    console.log(absoluteUrl('/'))
  })
}
