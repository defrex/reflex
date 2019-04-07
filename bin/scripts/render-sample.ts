import { promisify } from 'util'
import fs from 'fs'

import { absolutePath } from 'api/lib/path'
import { trimImage } from 'api/lib/image'
import { renderUrl } from 'api/lib/render'

const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

export default async function main() {
  await mkdir(absolutePath('public/render-sample'))

  let image = await renderUrl('https://www.google.com/')
  await writeFile(absolutePath(`public/render-sample/post-browser.png`), image)
  image = await trimImage(image)
  await writeFile(absolutePath(`public/render-sample/post-trim.png`), image)
}
