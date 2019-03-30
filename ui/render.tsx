import React, { FunctionComponentElement } from 'react'
import ReactDOM, { Renderer } from 'react-dom'
// import Loadable from 'react-loadable'
import App from 'ui/App'

async function render(
  renderFunction: Renderer,
  App: FunctionComponentElement<any>,
) {
  // await Loadable.preloadReady()

  const reactRoot = document.getElementById('app')

  renderFunction(App, reactRoot)
}

render(ReactDOM.hydrate, <App />)

// if (process.env.NODE_ENV === 'development' && module.hot && module.hot.accept) {
//   module.hot.accept('ui/App', () => {
//     render(ReactDOM.render, require('ui/App').default)
//   })
// }
