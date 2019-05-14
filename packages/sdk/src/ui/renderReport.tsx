import React from 'react'
import ReactDomServer from 'react-dom/server'
import { Document } from './components/Document'

export async function renderReport() {
  return ReactDomServer.renderToString(<Document />)
}
