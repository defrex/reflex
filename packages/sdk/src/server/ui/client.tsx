import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'src/server/ui/components/App'

// TODO: this doesn't have a builder, and thus no bundle
ReactDOM.hydrate(<App />, document.getElementById('app'))
