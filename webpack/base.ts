import webpack from 'webpack'
import config from 'api/config'

import { absolutePath } from '../api/lib/path'
import babelOptions from './babel.config'

export default {
  mode: config.environment,

  entry: ['babel-polyfill'],

  output: {
    path: absolutePath('./dist'),
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'babel-loader',
        options: babelOptions,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      ui: absolutePath('./ui'),
    },
  },

  plugins: [new webpack.EnvironmentPlugin(['SSL', 'DOMAIN', 'PORT'])],
}
