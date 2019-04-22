import { Storage } from '@google-cloud/storage'
import Zip from 'adm-zip'
import { absolutePath } from 'api/lib/path'
import ora from 'ora'

const projectId = 'reflex-236915'
const bucketName = 'reflex-sampler'

function upload(filename: string, content: Buffer): Promise<void> {
  const storage = new Storage({ projectId })
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

export default async function uploadFunction(
  functionName: string,
): Promise<string> {
  const spinner = ora('📁')
  spinner.start()

  const filename = `builds/${functionName}-${new Date().valueOf()}.zip`
  const uri = `gs://${bucketName}/${filename}`

  var zip = new Zip()
  zip.addLocalFolder(absolutePath(`functions/${functionName}/dist`))

  spinner.text = `📤 ${uri}`
  await upload(filename, zip.toBuffer())

  spinner.succeed()

  return uri
}
