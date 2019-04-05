import puppeteer from 'puppeteer'
import fs from 'fs'

import { Example, Render, prisma } from 'api/prisma'
import { absoluteUrl } from 'api/lib/url'
import { absolutePath } from 'api/lib/path'
import { trimImage } from 'api/lib/image'

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

  const directory = `/renders/${team.id}/${component.name}/`
  fs.mkdirSync(absolutePath(`public${directory}`), {
    recursive: true,
  })

  const path = `${directory}/${example.name}.png`
  const filename = absolutePath(`public${path}`)
  await page.screenshot({ path: filename, omitBackground: true })

  await browser.close()

  await trimImage(filename)

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
