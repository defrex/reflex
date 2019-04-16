import { Message } from '@google-cloud/pubsub'

interface Payload {
  hello: string
}

export function main(message: Message) {
  const payload: Payload = JSON.parse(
    Buffer.from((message.data as unknown) as string, 'base64').toString(),
  )
  console.log(`Hello ${payload.hello}`)

  message.ack()
}
