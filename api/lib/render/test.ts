import fs from 'fs'

import { absolutePath } from 'api/lib/path'
import { renderUrl } from 'api/lib/render'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
// const writeFile = promisify(fs.writeFile)

describe('renderUrl', () => {
  it('renders', async () => {
    const result = await renderUrl('https://defrex.com')
    // await writeFile(absolutePath('api/lib/render/test.result.png'), result)

    const expectedResult = await readFile(
      absolutePath('api/lib/render/test.result.png'),
    )

    expect(result).toEqual(expectedResult)
  })
})
