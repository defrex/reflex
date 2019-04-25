import absolutePath from 'api/lib/absolutePath'
import { renderUrl } from 'api/lib/render'
import fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
// const writeFile = promisify(fs.writeFile)

describe('renderUrl', () => {
  it('renders', async () => {
    const result = await renderUrl('https://defrex.com')
    // await writeFile(absolutePath('lib/render/test.result.png'), result)

    const expectedResult = await readFile(
      absolutePath('lib/render/test.result.png'),
    )

    expect(result).toEqual(expectedResult)
  })
})
