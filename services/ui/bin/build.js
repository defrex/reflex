#!/bin/env node
const { resolve } = require('path')
process.chdir(resolve(`${__dirname}/..`))

const webpack = require('webpack')
const config = require('../webpack.config')

webpack([config.client, config.server], async (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }

  const info = stats.toJson()

  if (stats.hasWarnings()) {
    for (const warning of info.warnings) {
      console.warn('\n\n', warning)
    }
  }

  if (stats.hasErrors()) {
    for (const error of info.errors) {
      console.error('\n\n', error)
    }
    process.exit(1)
  }
})
