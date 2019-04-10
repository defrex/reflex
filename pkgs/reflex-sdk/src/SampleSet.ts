import { SampleRenderFn } from './types'

export interface Sample {
  name: string
  render: SampleRenderFn
}

export class SampleSet {
  public samples: Array<Sample> = []

  constructor(public componentName: string) {}

  add(name: string, render: SampleRenderFn) {
    this.samples.push({ name, render })
    return this
  }
}
