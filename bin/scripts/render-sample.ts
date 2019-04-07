import { Storage } from '@google-cloud/storage'

import { trimImage } from 'api/lib/image'
import { renderUrl } from 'api/lib/render'
import config from 'api/config'

const storage = new Storage({ projectId: config.gcpProjectId })
const bucketName = 'reflexui.com'
const directoryName = `renders/${config.environment}`
const time = new Date().valueOf()

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
  let image = await renderUrl('https://www.google.com/')
  try {
    await upload(`${directoryName}/browser-${time}.png`, image)
  } catch (error) {
    console.error(error)
    return
  }

  image = await trimImage(image)
  try {
    await upload(`${directoryName}/trim-${time}.png`, image)
  } catch (error) {
    console.error(error)
    return
  }
}
