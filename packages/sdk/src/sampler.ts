import { resolve } from 'path'
import collectFilenames from './lib/collectFilenames'
import ensureAuthenticated from './lib/ensureAuthenticated'
import spinnerOp from './lib/spinnerOp'
import trimCwd from './lib/trimCwd'
import { getRenderSampleToDocument } from './renderSample'
import { SampleSet } from './SampleSet'
import { RenderedSampleToDocument, RenderSampleToDocument, RenderSampleToStrings } from './types'
export * from './types'

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
  renderedSampleToDocument,
}: SamplerOptions): Promise<void> {
  if (!renderSampleToDocument) {
    renderSampleToDocument = getRenderSampleToDocument(
      renderSampleToStrings,
      renderedSampleToDocument,
    )
  }
  await ensureAuthenticated()

  await spinnerOp({
    text: `Collecting ${
      typeof paths === 'string' ? trimCwd(paths) : paths.map((path) => trimCwd(path)).join(',')
    }`,
    run: async () => {
      const filenames: string[] = await collectFilenames(paths)
      for (const filename of filenames) {
        require(resolve(`${process.cwd()}/${filename}`))
      }
    },
  })

  const sampleCount = sampleSets.reduce((sum, sampleSet) => sum + sampleSet.length, 0)
  console.log(`Found ${sampleCount} samples from ${sampleSets.length} components`)

  for (const sampleSet of sampleSets) {
    await sampleSet.run(renderSampleToDocument)
  }
}

export function samplesOf(componentName: string): SampleSet {
  const sampleSet = new SampleSet(componentName)
  sampleSets.push(sampleSet)
  return sampleSet
}
