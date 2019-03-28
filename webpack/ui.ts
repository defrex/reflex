import webpack from 'webpack'
import merge from 'webpack-merge'
import { ReactLoadablePlugin } from 'react-loadable/webpack'

import baseConfig from './base'
import { absolutePath } from '../api/lib/path'

export default merge.smart(baseConfig, {
  name: 'ui',
  target: 'web',

  entry: [absolutePath('./ui/render')],

  output: {
    path: absolutePath('./public/dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/dist/',
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2|ico|xml|manifest|svg)$/,
        use: 'file-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_BROWSER: JSON.stringify(true),
    }),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
  ],
})
