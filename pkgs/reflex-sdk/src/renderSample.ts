import ReactDomServer from 'react-dom/server'
import {
  Document,
  RenderedSampleToDocument,
  RenderSampleToDocument,
  RenderSampleToStrings,
  SampleRenderFn
} from './types'

export interface RenderedSample {
  html: string
  css?: string
}

export async function renderSampleToStrings(sampleRender: SampleRenderFn): Promise<RenderedSample> {
  const rendered = await sampleRender()
  return {
    html: ReactDomServer.renderToString(rendered)
  }
}

export function renderedSampleToDocument(renderedSample: RenderedSample): Document {
  return `<html><head>${
    renderedSample.css ? `<style> ${renderedSample.css}</style>` : ''
  }</head><body>${renderedSample.html}</body></html>`
}

export function getRenderSampleToDocument(
  toStrings?: RenderSampleToStrings,
  toDoc?: RenderedSampleToDocument
): RenderSampleToDocument {
  const actualToStrings: RenderSampleToStrings = toStrings || renderSampleToStrings
  const actualToDoc: RenderedSampleToDocument = toDoc || renderedSampleToDocument

  return async function renderSampleToDocument(sampleRender: SampleRenderFn): Promise<Document> {
    const renderedSample = await actualToStrings(sampleRender)
    return actualToDoc(renderedSample)
  }
}
