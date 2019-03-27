import webpack from 'webpack'
import merge from 'webpack-merge'

import { absolutePath } from '../api/lib/path'
import baseConfig from './base'

export default merge.smart(baseConfig, {
  name: 'api',
  target: 'node',

  entry: [absolutePath('./api/index.ts')],

  output: {
    filename: 'api.js',
  },

  resolve: {
    alias: {
      api: absolutePath('./api'),
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_BROWSER: JSON.stringify(false),
    }),
  ],
})
