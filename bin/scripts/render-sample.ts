import { Storage } from '@google-cloud/storage'

import { trimImage } from 'api/lib/image'
import { renderUrl } from 'api/lib/render'
import config from 'api/config'
import { absoluteUrl } from 'ui/lib/url'

const storage = new Storage({ projectId: config.gcpProjectId })
const bucketName = 'reflexui.com'
const directoryName = `renders/${config.environment}`
const time = new Date().valueOf()

// const teamId = 'cjtp6ia6s00as0748aq40bbwq' // dev
const teamId = 'cjtpxdt9z00690804knk2emtz' // prod
const url = absoluteUrl(`/teams/${teamId}/examples/Button/Primary`)

async function upload(filename: string, content: Buffer) {
  return new Promise((resolve, reject) => {
    storage
      .bucket(bucketName)
      .file(filename)
      .createWriteStream()
      .on('error', reject)
      .on('finish', resolve)
      .end(content)
  })
}

export default async function main() {
  let image = await renderUrl(url)
  try {
    await upload(`${directoryName}/${time}-browser.png`, image)
  } catch (error) {
    console.error(error)
    return
  }

  image = await trimImage(image)
  try {
    await upload(`${directoryName}/${time}-trim.png`, image)
  } catch (error) {
    console.error(error)
    return
  }
}
