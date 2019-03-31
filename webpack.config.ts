/// <reference types="./@types/webpack-stats-plugin" />
import webpack from 'webpack'
import { StatsWriterPlugin } from 'webpack-stats-plugin'

import config from 'api/config'
import { absolutePath } from 'api/lib/path'

export default {
  mode: config.environment,
  name: 'ui',
  target: 'web',

  entry: [
    ...(config.environment === 'development'
      ? ['webpack-hot-middleware/client']
      : []),
    absolutePath('./ui/browser'),
  ],

  output: {
    path: absolutePath('./dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/dist/',
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

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      ui: absolutePath('./ui'),
    },
  },

  plugins: [
    new webpack.EnvironmentPlugin(['SSL', 'DOMAIN', 'PORT']),
    new webpack.DefinePlugin({
      IS_BROWSER: JSON.stringify(true),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new StatsWriterPlugin(),
  ],
} as webpack.Configuration
