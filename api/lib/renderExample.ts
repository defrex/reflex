import { trimImage } from 'api/lib/image'
import { absolutePath } from 'api/lib/path'
import { renderUrl } from 'api/lib/render'
import { absoluteUrl } from 'api/lib/url'
import { Example, prisma } from 'api/prisma'
import fs from 'fs'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

export default async function renderExample(example: Example): Promise<string> {
  const team = await prisma
    .example({ id: example.id })
    .component()
    .team()
  const component = await prisma.example({ id: example.id }).component()

  let image = await renderUrl(
    absoluteUrl(`/teams/${team.id}/examples/${component.name}/${example.name}`),
  )
  image = await trimImage(image)

  const directory = `/renders/${team.id}/${component.name}/`
  await mkdir(absolutePath(`public${directory}`), {
    recursive: true,
  })
  const path = `${directory}${example.name}.png`
  await writeFile(absolutePath(`public${path}`), image)

  return absoluteUrl(path)
}
