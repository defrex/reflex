import { ReflexClient } from '@reflexui/sdk'
import gql from 'gql-tag'
import parseDataUri from 'parse-data-uri'

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
          repoArchiveUrl
        }
      }
    `,
    {
      checkId: payload.checkId,
    },
  )

  const archive = parseDataUri(response.check.repoArchiveUrl)
  console.log('archive', archive.mimeType)
}
