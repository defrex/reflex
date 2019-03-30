import webpack from 'webpack'
import config from 'api/config'

import { absolutePath } from '../api/lib/path'

export default {
  mode: config.environment,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
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
