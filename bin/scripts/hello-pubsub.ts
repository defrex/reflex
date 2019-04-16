import { PubSub } from '@google-cloud/pubsub'

const pubsub = new PubSub()

export default async function main() {
  const topicName = 'sample-requests'
  const data = JSON.stringify({ hello: 'PubSub Functions' })
  const dataBuffer = Buffer.from(data)

  const messageId = await pubsub.topic(topicName).publish(dataBuffer)

  console.log(`Message ${messageId} published.`)
}
