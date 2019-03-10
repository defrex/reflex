const withTypescript = require('@zeit/next-typescript')
const path = require('path')

const config = require('./config').default

module.exports = withTypescript({
  useFileSystemPublicRoutes: false,

  webpack: (webpackConfig) => {
    webpackConfig.resolve.alias.ui = path.join(config.basePath, 'ui')
    webpackConfig.resolve.alias.gen = path.join(config.basePath, 'gen')

    webpackConfig.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      include: [ webpackConfig.context ],
      use: { loader: 'graphql-tag/loader' },
    })

    return webpackConfig
  },
})
