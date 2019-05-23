import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { App } from 'src/server/ui/components/App'
import { Document } from 'src/server/ui/components/Document'

export function render(): string {
  const node = (
    <Document>
      <App />
    </Document>
  )
  return ReactDOMServer.renderToString(node)
}
