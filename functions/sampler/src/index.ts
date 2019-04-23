import { ReflexClient } from '@reflexui/sdk'
import gql from 'gql-tag'

interface Payload {
  hello: string
  checkId: string
  authToken: string
}

export async function main(message: { data: string }) {
  const payload: Payload = JSON.parse(
    Buffer.from(message.data, 'base64').toString(),
  )
  console.log(`Hello ${payload.hello}`)

  const client = new ReflexClient(payload.authToken)

  const response = await client.request(gql`
    query SampleCheck($checkId: String!) {
      hello
      check(id: $checkId) {
        repoSource
      }
    }
  `)
  console.log(response)
}
