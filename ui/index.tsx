import ReactDOMServer from 'react-dom/server'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import { Application, Request, Response } from 'express'
// import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from '../webpack/ui'
import Document from 'ui/Document'
// import config from 'api/config'

export default function applyUiMiddleware(app: Application) {
  // if (config.environment === 'production') {
  //   const render = require('../dist/render').default
  //   app.use(render)
  // } else {
  const compiler = webpack(webpackConfig)
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: '/',
      stats: 'minimal',
      serverSideRender: true,
    }),
  )
  // app.use(webpackHotMiddleware(compiler))
  // }

  // ❗YOU ARE HERE: render this document❗
  app.use((_req: Request, res: Response) => {
    res.send(ReactDOMServer.renderToString(<Document />))
  })
}

// import Loadable from 'react-loadable'
// import { getBundles } from 'react-loadable/webpack'
// import stats from '../build/react-loadable.json'

// app.get('/', (req, res) => {
//   let modules = []

//   let html = ReactDOMServer.renderToString(
//     <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
//       <App />
//     </Loadable.Capture>,
//   )

//   let bundles = getBundles(stats, modules)

//   res.send(`
//   <!doctype html>
//   <html lang="en">
//     <head>...</head>
//     <body>
//       <div id="app">${html}</div>
//       <script src="/dist/manifest.js"></script>
//       ${bundles.map(bundle => {
//         return `<script src="/dist/${bundle.file}"></script>`
//         // alternatively if you are using publicPath option in webpack config
//         // you can use the publicPath value from bundle, e.g:
//         // return `<script src="${bundle.publicPath}"></script>`
//       }).join('\n')}
//       <script src="/dist/main.js"></script>
//     </body>
//   </html>
// `);
//   // ...
// })
