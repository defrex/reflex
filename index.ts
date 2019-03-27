import express from 'express'
import cookieSession from 'cookie-session'

import applyApiMiddleware from 'api'
import config from 'api/config'
import { absoluteUrl } from 'api/lib/url'

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

export default async function main() {
  const app = express()

  app.use(
    cookieSession({
      secret: config.secretKey,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
    }),
  )

  await applyApiMiddleware(app)

  if (config.environment === 'production') {
  } else {
    // const compiler = webpack([clientConfigDev, serverConfigDev])
    // app.use(webpackDevMiddleware(compiler, {
    //   publicPath,
    //   stats: 'minimal',
    //   serverSideRender: true,
    // }))
    // app.use(webpackHotMiddleware(compiler.compilers.find(({ name }) => name === 'client')))
  }

  app.listen(config.port, () => {
    console.log(absoluteUrl('/'))
  })
}
