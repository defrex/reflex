const withTypescript = require('@zeit/next-typescript')
const path = require('path')
const webpack = require('webpack')

module.exports = withTypescript({
  useFileSystemPublicRoutes: false,

  webpack: (webpackConfig) => {
    webpackConfig.resolve.alias.ui = path.join(__dirname, 'ui')
    webpackConfig.resolve.alias.gen = path.join(__dirname, 'gen')

    webpackConfig.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      include: [ webpackConfig.context ],
      use: { loader: 'graphql-tag/loader' },
    })

    webpackConfig.plugins.push(new webpack.EnvironmentPlugin(['SSL', 'DOMAIN']))

    return webpackConfig
  },
})
