import Configstore from 'configstore'
import { getAuthToken } from './auth'

const CONFIG_NAME = 'reflex'

export default async function cli() {
  console.log('Hello CLI!')
  const conf = new Configstore(CONFIG_NAME)
  let authToken = conf.get('authToken')
  if (!authToken) {
    authToken = await getAuthToken()
    conf.set('authToken', authToken)
  }
  if (authToken) {
    console.log('We got a token!', authToken)
  }
}
