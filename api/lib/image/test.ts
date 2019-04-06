import fs from 'fs'
import { promisify } from 'util'

import { trimImage } from 'api/lib/image'
import { absolutePath } from 'api/lib/path'

const readFile = promisify(fs.readFile)

describe('trimImage', () => {
  it('trims', async () => {
    const result = await trimImage(absolutePath('api/lib/image/test.png'))
    const expectedResult = await readFile(
      absolutePath('api/lib/image/test.result.png'),
    )

    expect(result).toEqual(expectedResult)
  })
})
