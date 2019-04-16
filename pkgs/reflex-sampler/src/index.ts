interface Event {
  eventId: string
  resource: any
}

interface Payload {}

export function main(payload: Payload, event: Event) {
  console.log(payload)
}
