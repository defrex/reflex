const { resolve } = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { StatsWriterPlugin } = require('webpack-stats-plugin')

const config = {
  environment: process.env.NODE_ENV,
}

function absolutePath(path) {
  return resolve(`${__dirname}/${path}`)
}

const base = {
  mode: config.environment,
  devtool: 'source-map',

  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/dist/',
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      ui: absolutePath('.'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: absolutePath('tsconfig.json'),
        },
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2|ico|xml|manifest|svg)$/,
        use: 'file-loader',
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin(['SSL', 'DOMAIN', 'PORT', 'REFLEX_ENDPOINT']),
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify(config.environment),
      'process.env.GOOGLE_ANALYTICS_ID': JSON.stringify(
        process.env.GOOGLE_ANALYTICS_ID,
      ),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

module.exports.client = {
  ...base,

  name: 'client',
  target: 'web',

  entry: {
    client: [
      ...(config.environment === 'development'
        ? ['webpack-hot-middleware/client']
        : []),
      absolutePath('client'),
    ],
  },

  output: {
    ...base.output,
    path: absolutePath('public/dist'),
  },

  plugins: [
    ...base.plugins,
    new StatsWriterPlugin({ filename: 'client-stats.json' }),
  ],
}

module.exports.server = {
  ...base,

  name: 'server',
  target: 'node',

  entry: { server: absolutePath('server') },

  output: {
    ...base.output,
    path: absolutePath('dist'),
    libraryTarget: 'commonjs2',
  },

  externals: [nodeExternals()],

  plugins: [
    ...base.plugins,
    new StatsWriterPlugin({ filename: 'server-stats.json' }),
  ],
}
