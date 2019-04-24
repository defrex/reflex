import { PubSub } from '@google-cloud/pubsub'
import config from 'api/config'
import absolutePath from 'api/lib/absolutePath'

const pubsub = new PubSub()

export default async function callFunction(functionName: string, payload: any) {
  const data = Buffer.from(JSON.stringify(payload))
  if (config.environment === 'development') {
    const { main } = require(absolutePath(
      `../../functions/${functionName}/dist`,
    ))
    await main({ data: data.toString('base64') })
    console.info(`Called ${functionName}`)
  } else {
    const topic = `functions-${functionName}`
    const messageId = await pubsub.topic(topic).publish(data)
    console.info(`Published ${topic}/${messageId}`)
  }
}
