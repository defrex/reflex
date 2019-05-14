import getPort from 'get-port'
import collectFilenames from './lib/collectFilenames'
import { getRenderSampleToDocument } from './renderSample'
import { RenderedSampleToDocument, RenderSampleToDocument, RenderSampleToStrings } from './types'

export interface Options {
  paths: string | string[]
  port?: number
  filenames?: string[]
  renderSampleToDocument?: RenderSampleToDocument
  renderSampleToStrings?: RenderSampleToStrings
  renderedSampleToDocument?: RenderedSampleToDocument
}

const defaultOptions: Options = {
  paths: '**/samples.js',
}

class Config {
  filenames: string[] = []
  paths: string[] = []
  renderSampleToDocument: RenderSampleToDocument = getRenderSampleToDocument()
  port: number = 3000

  async setOptions(options: Options) {
    options = { ...defaultOptions, ...options }
    this.filenames = await collectFilenames(options.paths)
    this.paths = typeof options.paths === 'string' ? [options.paths] : options.paths
    this.renderSampleToDocument =
      options.renderSampleToDocument ||
      getRenderSampleToDocument(options.renderSampleToStrings, options.renderedSampleToDocument)
    this.port = options.port || (await getPort({ port: getPort.makeRange(3000, 4000) }))
  }
}

export default new Config()
