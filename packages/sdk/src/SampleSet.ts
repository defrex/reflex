import { gitInfo } from './git'
import client from './lib/client'
import spinnerOp from './lib/spinnerOp'
import { Sample } from './Sample'
import { SampleRenderFn } from './types'

export const sampleSets: Array<SampleSet> = []

export class SampleSet {
  public samples: Array<Sample> = []

  constructor(public componentName: string) {}

  get length(): number {
    return this.samples.length
  }

  add(name: string, sampleRenderFn: SampleRenderFn): SampleSet {
    this.samples.push(new Sample(this.componentName, name, sampleRenderFn))
    return this
  }

  async render() {
    for (const sample of this.samples) {
      await spinnerOp({
        text: `Rendering ${this.componentName}/${sample.name}`,
        run: async () => {
          sample.render()
        },
      })
    }
  }

  async upload() {
    const { branch, commit } = await gitInfo()

    for (const sample of this.samples) {
      await spinnerOp({
        text: `Uploading ${this.componentName}/${sample.name}`,
        run: async () => {
          const response = await client.uploadSample({
            componentName: this.componentName,
            sampleName: sample.name,
            html: sample.document!,
            branch,
            commit,
          })
          if (!response.createRender.status.success) {
            console.error(response.createRender.status.errors)
            throw new Error('Unexpected GraphQL Error')
          }
        },
      })
    }
  }
}

export function samplesOf(componentName: string): SampleSet {
  const sampleSet = new SampleSet(componentName)
  sampleSets.push(sampleSet)
  return sampleSet
}
