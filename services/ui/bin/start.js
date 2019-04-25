#!/usr/bin/env node

const config = {
  environment: process.env.NODE_ENV || 'production',
  port: parseInt(process.env.PORT),
}

require('@google-cloud/debug-agent').start({
  serviceContext: {
    service: 'ui',
    version: config.environment,
  },
})

const ErrorReporting = require('@google-cloud/error-reporting').ErrorReporting
const express = require('express')
const morgan = require('morgan')
const { resolve } = require('path')

function absolutePath(path) {
  return resolve(`${__dirname}/../${path}`)
}

async function main() {
  const app = express()
  const errors = new ErrorReporting()

  if (config.environment === 'development') {
    app.use(morgan('dev'))
  }

  app.use(express.static(absolutePath('/public')))

  if (config.environment === 'development') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
    const webpackConfigs = require('../webpack.config')

    const compiler = webpack([webpackConfigs.client, webpackConfigs.server])
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

    app.get('*', webpackHotServerMiddleware(compiler, { chunkName: 'server' }))
  } else {
    const serverStats = require(absolutePath('dist/server-stats.json'))
    const clientStats = require(absolutePath('public/dist/client-stats.json'))
    const serverRendererPath = absolutePath(
      `/dist/${serverStats.assetsByChunkName.server[0]}`,
    )
    const serverRenderer = require(serverRendererPath).default

    app.get('*', serverRenderer({ clientStats }))
  }

  app.use(errors.express)
  app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`)
  })
}
main()
