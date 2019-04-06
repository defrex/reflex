import fs from 'fs'

import { absolutePath } from 'api/lib/path'
import { renderUrl } from 'api/lib/render'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

describe('renderUrl', () => {
  it('renders', async () => {
    const result = await renderUrl('https://defrex.com')
    const expectedResult = await readFile(
      absolutePath('api/lib/render/test.result.png'),
    )

    expect(result).toEqual(expectedResult)
  })
})
