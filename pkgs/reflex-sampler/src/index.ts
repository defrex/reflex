import { Message } from '@google-cloud/pubsub'

interface Event {
  eventId: string
  resource: any
}

export function main(message: Message, event: Event) {
  console.log(message.data.toString())
}
