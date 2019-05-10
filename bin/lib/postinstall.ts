import absolutePath from 'bin/lib/absolutePath'
import run from 'bin/lib/run'
import rawGlob from 'glob'
import { promisify } from 'util'
const glob = promisify(rawGlob)

async function main() {
  const pattern = absolutePath('./+(functions|services|packages)/*')
  const projects = await glob(pattern)

  for (const project of projects) {
    await run(['npm', 'install'], project)
  }
}
main()
