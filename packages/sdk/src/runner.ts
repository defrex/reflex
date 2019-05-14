import { resolve } from 'path'
import config, { Options } from './config'
import ensureAuthenticated from './lib/ensureAuthenticated'
import spinnerOp from './lib/spinnerOp'
import trimCwd from './lib/trimCwd'
import { sampleSets } from './SampleSet'
import { startServer } from './ui'
export * from './types'

export async function run(options: Options): Promise<void> {
  await config.setOptions(options)
  await ensureAuthenticated()

  await spinnerOp({
    text: `Collecting ${config.paths.map((path) => trimCwd(path)).join(',')}`,
    run: async () => {
      for (const filename of config.filenames) {
        require(resolve(`${process.cwd()}/${filename}`))
      }
    },
  })

  const sampleCount = sampleSets.reduce((sum, sampleSet) => sum + sampleSet.length, 0)
  console.log(`Found ${sampleCount} samples from ${sampleSets.length} components`)

  for (const sampleSet of sampleSets) {
    await sampleSet.render()
  }

  await startServer()
  console.log(`http://localhost:${config.port}`)
}
