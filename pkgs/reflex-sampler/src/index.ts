import { Message } from '@google-cloud/pubsub'

interface Event {
  eventId: string
  resource: any
}

interface Payload {
  hello: string
}

export function main(message: Message, event: Event) {
  const payload: Payload = JSON.parse(
    Buffer.from((message.data as unknown) as string, 'base64').toString(),
  )
  console.log(`Hello ${payload.hello}`)
}
