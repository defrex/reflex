import { getAuthToken } from '../auth'
import config from '../config'

export default async function ensureAuthenticated() {
  let authToken = config.get('authToken')
  if (!authToken) {
    authToken = await getAuthToken()
    config.set('authToken', authToken)
  }
}
