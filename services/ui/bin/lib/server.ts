#!/usr/bin/env node
import { ErrorReporting } from '@google-cloud/error-reporting'
import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import { resolve } from 'path'

function absolutePath(path: string) {
  return resolve(`${__dirname}/../../${path}`)
}

const config = {
  environment: process.env.NODE_ENV || 'production',
  port: parseInt(process.env.PORT!),
}

let errorReporting: ErrorReporting
if (config.environment === 'production') {
  errorReporting = new ErrorReporting()
}

export default async function main() {
  const app = express()

  app.use(morgan(config.environment === 'development' ? 'dev' : 'common'))
  app.use(cookieParser())
  app.use(express.static(absolutePath('/public')))

  app.get('/api/logout', (_req, res) => {
    res.clearCookie('Authorization')
    res.redirect('/')
  })

  app.get('/api/login', (req, res) => {
    if (!req.query.token) {
      res.sendStatus(400)
      return
    }
    res.cookie('Authorization', `Bearer ${req.query.token}`, {
      httpOnly: true,
      secure: req.secure,
      sameSite: 'strict',
    })
    res.redirect('/dashboard')
  })

  if (config.environment === 'development') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
    const webpackConfigs = require('../../webpack.config')

    const compiler = webpack([webpackConfigs.client, webpackConfigs.server])
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: '/dist',
        stats: 'minimal',
        serverSideRender: true,
      }),
    )

    const clientCompiler = compiler.compilers.find(
      ({ name }: { name: string }) => name === 'client',
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

  if (errorReporting) {
    app.use(errorReporting.express)
  }
  app.listen(config.port, () => {
    process.stderr.write(`http://localhost:${config.port}\n`)
  })
}
