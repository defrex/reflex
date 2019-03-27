import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import stats from '../build/react-loadable.json'

app.get('/', (req, res) => {
  let modules = []

  let html = ReactDOMServer.renderToString(
    <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
      <App />
    </Loadable.Capture>,
  )

  let bundles = getBundles(stats, modules)

  // ...
})
