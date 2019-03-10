const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript({
  useFileSystemPublicRoutes: false,

  webpack: (webpackConfig) => {
    webpackConfig.resolve.alias.ui = __dirname

    webpackConfig.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      include: [ webpackConfig.context ],
      use: { loader: 'graphql-tag/loader' },
    })

    return webpackConfig
  },
})
