#!/bin/env node
require('./lib/setup')

const webpack = require('webpack')
const config = require('../webpack.config').default
// const buildInfo = require('./lib/buildInfo').default

webpack(config, async (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }

  const info = stats.toJson()

  if (stats.hasErrors()) {
    for (const error of info.errors) {
      console.error('\n\n', error)
    }
  }

  if (stats.hasWarnings()) {
    for (const warning of info.warnings) {
      console.warn('\n\n', warning)
    }
  }

  // await buildInfo(info)
})
