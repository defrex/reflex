import absolutePath from 'api/lib/absolutePath'
import { trimImage } from 'api/lib/image'
import { renderUrl } from 'api/lib/render'
import { absoluteUrl } from 'api/lib/url'
import { prisma, Sample } from 'api/prisma'
import fs from 'fs'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

export default async function renderSample(sample: Sample): Promise<string> {
  const team = await prisma
    .sample({ id: sample.id })
    .component()
    .team()
  const component = await prisma.sample({ id: sample.id }).component()

  let image = await renderUrl(
    absoluteUrl(`/teams/${team.id}/samples/${component.name}/${sample.name}`),
  )
  image = await trimImage(image)

  const directory = `/renders/${team.id}/${component.name}/`
  await mkdir(absolutePath(`public${directory}`), {
    recursive: true,
  })
  const path = `${directory}${sample.name}.png`
  await writeFile(absolutePath(`public${path}`), image)

  return absoluteUrl(path)
}
