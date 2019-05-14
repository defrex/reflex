import config from './config'
import { SampleRenderFn } from './types'

export class Sample {
  document: string | null = null

  constructor(
    public componentName: string,
    public name: string,
    private sampleRenderFn: SampleRenderFn,
  ) {}

  async render() {
    this.document = await config.renderSampleToDocument(this.sampleRenderFn)
    return this.document
  }
}
