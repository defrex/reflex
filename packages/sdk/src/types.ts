import { ReactElement } from 'react'

export type MaybePromise<T> = T | Promise<T>
export type SampleRenderFn = () => MaybePromise<ReactElement>
export type Document = string
export type RenderedSample = {
  html: string
  css?: string
}

export type RenderSampleToDocument = (sampleRender: SampleRenderFn) => MaybePromise<Document>
export type RenderSampleToStrings = (sampleRender: SampleRenderFn) => MaybePromise<RenderedSample>
export type RenderedSampleToDocument = (renderedSample: RenderedSample) => MaybePromise<Document>
