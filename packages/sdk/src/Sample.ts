import config from './config'
import { SampleRenderFn } from './types'

export interface SampleArgs {
  componentName: string
  name: string
  sampleRenderFn: SampleRenderFn
  document?: string
}

export class Sample {
  public componentName: string
  public name: string
  public document?: string
  private sampleRenderFn: SampleRenderFn

  constructor({ componentName, name, sampleRenderFn, document }: SampleArgs) {
    this.componentName = componentName
    this.name = name
    this.sampleRenderFn = sampleRenderFn
    this.document = document
  }

  async render() {
    this.document = await config.renderSampleToDocument(this.sampleRenderFn)
    return this.document
  }

  async save() {}
}
