import { trimImage } from 'api/lib/image'
import { absolutePath } from 'api/lib/path'

describe('trimImage', () => {
  it('trims', async () => {
    await trimImage(absolutePath('api/lib/image/test.png'))
  })
})
