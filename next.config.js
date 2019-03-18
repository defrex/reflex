const withTypescript = require('@zeit/next-typescript')
const withOffline = require('next-offline')
const path = require('path')
const webpack = require('webpack')

let nextConfig = {
  useFileSystemPublicRoutes: false,

  webpack: (webpackConfig) => {
    webpackConfig.resolve.alias.ui = path.join(__dirname, 'ui')

    webpackConfig.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      include: [webpackConfig.context],
      use: { loader: 'graphql-tag/loader' },
    })

    webpackConfig.plugins.push(
      new webpack.EnvironmentPlugin(['SSL', 'DOMAIN', 'PORT']),
    )

    return webpackConfig
  },
}

nextConfig = withTypescript(nextConfig)
nextConfig = withOffline(nextConfig)

module.exports = nextConfig
