import run from '@reflexui/easy-run'
import { ReflexClient } from '@reflexui/sdk'
import { mkdir as _mkdir, writeFile as _writeFile } from 'fs'
import gql from 'gql-tag'
import parseDataUri from 'parse-data-uri'
import { promisify } from 'util'

const writeFile = promisify(_writeFile)
const mkdir = promisify(_mkdir)

interface Payload {
  hello?: string
  checkId: string
  authToken: string
}

export async function main(message: { data: string }) {
  const payload: Payload = JSON.parse(
    Buffer.from(message.data, 'base64').toString(),
  )
  if (payload.hello) {
    console.log(`Hello ${payload.hello}`)
    return
  }

  const client = new ReflexClient(payload.authToken)

  console.log(await client.hello())

  const response = await client.request<any>(
    gql`
      query SampleCheck($checkId: ID!) {
        check(id: $checkId) {
          repoTarball
          commit

          repo {
            owner
            name
          }
        }
      }
    `,
    {
      checkId: payload.checkId,
    },
  )

  const directory = '/tmp/sampler'
  const archiveFilename = `${directory}/repo.tar.gz`
  const archiveContent = parseDataUri(response.check.repoTarball).data
  const repoDirectory = `${directory}/${[
    response.check.repo.owner,
    response.check.repo.name,
    response.check.commit,
  ].join('-')}`

  try {
    await mkdir(directory)
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error
    }
  }

  await writeFile(archiveFilename, archiveContent)
  await run(['tar', '-xzf', archiveFilename], { cwd: directory })
  await run(['npm', 'install'], { cwd: repoDirectory })
  await run(['./bin/sample.js'], { cwd: repoDirectory })
}
