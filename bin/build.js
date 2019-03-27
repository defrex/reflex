#!/bin/env node
require('./lib/setup')

const webpack = require('webpack')

const uiWebpackConfig = require('../webpack/ui').default
// const apiWebpackConfig = require('../webpack/api').default

const handler = (entry) => (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('🛑', entry)
    // console.error(stats.compilation.errors)
  } else {
    console.log('✅', entry)
  }
}

webpack(uiWebpackConfig, handler('ui'))
// webpack(apiWebpackConfig, handler('api'))
