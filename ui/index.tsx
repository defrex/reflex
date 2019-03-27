import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
// import App from 'ui/App'

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(<div />, document.getElementById('app'))
})
