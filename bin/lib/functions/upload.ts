import { Storage } from '@google-cloud/storage'
import Zip from 'adm-zip'
import absolutePath from 'bin/lib/absolutePath'
import { createHash } from 'crypto'
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

  var zip = new Zip()
  zip.addLocalFolder(absolutePath(`functions/${functionName}/dist`))
  const data = zip.toBuffer()

  const hash = createHash('sha256')
  hash.update(data)
  const hexDigest = hash.digest('hex')

  const filename = `builds/${functionName}-${hexDigest}.zip`
  const uri = `gs://${bucketName}/${filename}`

  spinner.text = `📤 ${uri}`
  await upload(filename, zip.toBuffer())

  spinner.succeed()

  return uri
}
