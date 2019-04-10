import collectFilenames from './collectFilenames'
import { getRenderSampleToDocument } from './renderSample'
import { SampleSet } from './SampleSet'
import { RenderedSampleToDocument, RenderSampleToDocument, RenderSampleToStrings } from './types'

const sampleSets: Array<SampleSet> = []

export interface SamplerOptions {
  paths: string | string[]
  renderSampleToDocument?: RenderSampleToDocument
  renderSampleToStrings?: RenderSampleToStrings
  renderedSampleToDocument?: RenderedSampleToDocument
}

export async function sampler({
  paths,
  renderSampleToDocument,
  renderSampleToStrings,
  renderedSampleToDocument
}: SamplerOptions): Promise<void> {
  const filenames = await collectFilenames(paths)

  if (!renderSampleToDocument) {
    renderSampleToDocument = getRenderSampleToDocument(
      renderSampleToStrings,
      renderedSampleToDocument
    )
  }

  process.stdout.write('Loading files\n')
  for (const filename of filenames) {
    process.stdout.write(`\t${filename}...`)
    require(filename)
    process.stdout.write(' ✅\n')
  }
  process.stdout.write('\n')

  process.stdout.write('Rendering samples\n')
  let results: string[] = []
  for (const sampleSet of sampleSets) {
    for (const sample of sampleSet.samples) {
      process.stdout.write(`\t${sample.name}...`)
      const result = await renderSampleToDocument(sample.render)
      results.push(result)
      process.stdout.write(' ✅\n')
    }
  }
}

export function samplesOf(componentName: string): SampleSet {
  const sampleSet = new SampleSet(componentName)
  sampleSets.push(sampleSet)
  return sampleSet
}
