import rawGlob from 'glob'
import { ReactElement } from 'react'
import ReactDomServer from 'react-dom/server'
import { promisify } from 'util'

const glob = promisify(rawGlob)

const sampleSets: Array<SampleSet> = []

type RenderFn = () => ReactElement

export interface Sample {
  name: string
  renderFn: RenderFn
}

export class SampleSet {
  private samples: Array<Sample> = []

  constructor(public componentName: string) {}

  add(name: string, renderFn: RenderFn) {
    this.samples.push({ name, renderFn })
    return this
  }

  async run() {
    console.log(`Running samples for component ${this.componentName}`)
    for (const sample of this.samples) {
      console.log(`\t${sample.name}...`)
      const htmlSample = ReactDomServer.renderToString(sample.renderFn())
      console.log(htmlSample)
    }
  }
}

export function samplesOf(componentName: string): SampleSet {
  const sampleSet = new SampleSet(componentName)
  sampleSets.push(sampleSet)
  return sampleSet
}

interface SamplerOptions {
  path: string
}

export default async function sampler({ path }: SamplerOptions): Promise<void> {
  const files = await glob(path)
  console.log('Loading files...')
  for (const file of files) {
    require(file)
    console.log(file)
  }
  console.log('')

  for (const sampleSet of sampleSets) {
    await sampleSet.run()
  }
}
