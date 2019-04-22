import { ReflexClient } from '@reflexui/sdk'
import { exec as _exec } from 'child_process'
import gql from 'gql-tag'
import { promisify } from 'util'

const exec = promisify(_exec)

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
    query {
      hello
    }
  `)
  console.log(client)
}
