import absolutePath from 'api/lib/absolutePath'
import { trimImage } from 'api/lib/image'
import fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
// const writeFile = promisify(fs.writeFile)

describe('trimImage', () => {
  it('trims', async () => {
    const result = await trimImage(absolutePath('lib/image/test.png'))
    // await writeFile(absolutePath('lib/image/test.result.png'), result)

    const expectedResult = await readFile(
      absolutePath('lib/image/test.result.png'),
    )

    expect(result).toEqual(expectedResult)
  })
})
