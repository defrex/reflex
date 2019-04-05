import puppeteer from 'puppeteer'
import { promisify } from 'util'
import fs from 'fs'

import { Example, Render, prisma } from 'api/prisma'
import { absoluteUrl } from 'api/lib/url'
import { absolutePath } from 'api/lib/path'
import { trimImage } from 'api/lib/image'

const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

export default async function renderExample(example: Example): Promise<Render> {
  const team = await prisma
    .example({ id: example.id })
    .component()
    .team()
  const component = await prisma.example({ id: example.id }).component()

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  })

  const page = await browser.newPage()
  await page.goto(
    absoluteUrl(`/teams/${team.id}/examples/${component.name}/${example.name}`),
  )
  let image: Buffer = await page.screenshot({
    encoding: 'binary',
    omitBackground: true,
  })
  await browser.close()

  image = await trimImage(image)

  const directory = `/renders/${team.id}/${component.name}/`
  await mkdir(absolutePath(`public${directory}`), {
    recursive: true,
  })
  const path = `${directory}/${example.name}.png`
  await writeFile(absolutePath(`public${path}`), image)

  const render = await prisma.createRender({
    imageUrl: absoluteUrl(path),
    example: {
      connect: {
        id: example.id,
      },
    },
  })

  return render
}
