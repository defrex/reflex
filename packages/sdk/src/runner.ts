import { resolve } from 'path'
import { setCurrentlyFilename } from 'src/Component'
import { componentSet } from 'src/componentSet'
import config, { Options } from 'src/config'
import ensureAuthenticated from 'src/lib/ensureAuthenticated'
import spinnerOp from 'src/lib/spinnerOp'
import trimCwd from 'src/lib/trimCwd'
import { startServer } from 'src/server'
export * from 'src/types'

export async function run(options: Options): Promise<void> {
  await config.setOptions(options)
  await ensureAuthenticated()

  await spinnerOp({
    text: `Collecting ${config.paths.map((path) => trimCwd(path)).join(',')}`,
    run: async () => {
      for (const filename of config.filenames) {
        const absFilename = resolve(`${process.cwd()}/${filename}`)
        setCurrentlyFilename(absFilename)
        require(absFilename)
      }
    },
  })

  console.log(`Found ${componentSet.sampleCount()} samples from ${componentSet.length} components`)

  await componentSet.render()

  await startServer()
  console.log(`http://localhost:${config.port}`)
}
