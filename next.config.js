const withTypescript = require('@zeit/next-typescript')
const path = require('path')

module.exports = withTypescript({
  useFileSystemPublicRoutes: false,

  // runtimeConfig: {
  // },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.alias.ui = path.join(__dirname, 'ui')
    webpackConfig.resolve.alias.gen = path.join(__dirname, 'gen')

    webpackConfig.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      include: [ webpackConfig.context ],
      use: { loader: 'graphql-tag/loader' },
    })

    return webpackConfig
  },
})
