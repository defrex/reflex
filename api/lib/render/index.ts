// import puppeteer from 'puppeteer'

export async function renderUrl(_url: string): Promise<Buffer> {
  // const browser = await puppeteer.launch({
  //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
  //   defaultViewport: {
  //     width: 1920,
  //     height: 1080,
  //   },
  // })

  // const page = await browser.newPage()
  // await page.goto(url)
  // let image: Buffer = await page.screenshot({
  //   encoding: 'binary',
  //   omitBackground: true,
  // })
  // await browser.close()

  // return image
  return new Buffer('')
}
