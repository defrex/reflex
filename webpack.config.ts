/// <reference types="./@types/webpack-stats-plugin" />
import webpack from 'webpack'
import { StatsWriterPlugin } from 'webpack-stats-plugin'

import config from 'api/config'
import { absolutePath } from 'api/lib/path'

const base = {
  mode: config.environment,

  output: {
    path: absolutePath('./dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/dist/',
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      ui: absolutePath('./ui'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2|ico|xml|manifest|svg)$/,
        use: 'file-loader',
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin(['SSL', 'DOMAIN', 'PORT']),
    new webpack.DefinePlugin({
      IS_BROWSER: JSON.stringify(true),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}

export const client = {
  ...base,

  name: 'client',
  target: 'web',

  entry: {
    client: [
      ...(config.environment === 'development'
        ? ['webpack-hot-middleware/client']
        : []),
      absolutePath('./ui/client'),
    ],
  },

  plugins: [
    ...base.plugins,
    new StatsWriterPlugin({ filename: 'client-stats.json' }),
  ],
} as webpack.Configuration

export const server = {
  ...base,

  name: 'server',
  target: 'node',
  devtool: 'source-map',

  entry: { server: absolutePath('./ui/server') },

  output: {
    ...base.output,
    libraryTarget: 'commonjs2',
  },

  plugins: [
    ...base.plugins,
    new StatsWriterPlugin({ filename: 'server-stats.json' }),
  ],
} as webpack.Configuration

export default [client, server]
