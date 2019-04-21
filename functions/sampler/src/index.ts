import { exec as _exec } from 'child_process'
import { promisify } from 'util'

const exec = promisify(_exec)

interface Payload {
  hello: string
  checkId: string
}

export async function main(message: { data: string }) {
  const payload: Payload = JSON.parse(
    Buffer.from(message.data, 'base64').toString(),
  )
  console.log(`Hello ${payload.hello}`)

  console.log(await exec('git --version'))
}
