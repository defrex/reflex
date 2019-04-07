import { Storage } from '@google-cloud/storage'
import config from 'api/config'
import { trimImage } from 'api/lib/image'
import { renderUrl } from 'api/lib/render'
import colors from 'colors'

const storage = new Storage({ projectId: config.gcpProjectId })
const bucketName = 'reflexui.com'
const directoryName = `renders/${config.environment}`
const time = new Date().valueOf()

// const teamId = 'cjtp6ia6s00as0748aq40bbwq' // dev
const teamId = 'cjtpxdt9z00690804knk2emtz' // prod
// const url = absoluteUrl(`/teams/${teamId}/examples/Button/Primary`)
const url = `https://reflexui.com/teams/${teamId}/examples/Button/Primary`

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
  console.log(colors.green(`Rendering ${url}`))
  let image: Buffer
  try {
    image = await renderUrl(url)
  } catch (error) {
    console.log(colors.dim('image = await renderUrl(url)'))
    console.error(error)
    return
  }

  try {
    await upload(`${directoryName}/${time}-browser.png`, image)
  } catch (error) {
    console.log(
      colors.dim('await upload(`${directoryName}/${time}-browser.png`, image)'),
    )
    console.error(error)
    return
  }

  try {
    image = await trimImage(image)
  } catch (error) {
    console.log(colors.dim('image = await trimImage(image)'))
    console.error(error)
    return
  }

  try {
    await upload(`${directoryName}/${time}-trim.png`, image)
  } catch (error) {
    console.log(
      colors.dim('await upload(`${directoryName}/${time}-trim.png`, image)'),
    )
    console.error(error)
    return
  }
}
