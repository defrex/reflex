import rawGlob from 'glob'
import { promisify } from 'util'

const glob = promisify(rawGlob)

export default async function collectFilenames(paths: string | string[]): Promise<string[]> {
  if (typeof paths === 'string') {
    paths = [paths]
  }
  const filenames: string[] = []
  for (const path of paths) {
    const unglobbed = await glob(path)
    filenames.push(...unglobbed)
  }
  return filenames
}
