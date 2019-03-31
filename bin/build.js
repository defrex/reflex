#!/bin/env node
require('./lib/setup')

const webpack = require('webpack')
const webpackConfig = require('../webpack.config').default

webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error('🛑')
    console.error(err)
  } else if (stats.hasErrors()) {
    console.error('🛑')
    for (const error of stats.compilation.errors) {
      console.error('\n\n', error)
    }
  }
})
