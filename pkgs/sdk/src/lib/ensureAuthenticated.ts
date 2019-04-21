import { getAuthToken } from '../auth'
import config, { AUTH_KEY } from '../config'
import client from './client'

export default async function ensureAuthenticated() {
  let authToken = config.get(AUTH_KEY)
  if (!authToken) {
    authToken = await getAuthToken()
    config.set(AUTH_KEY, authToken)
    client.setAuthToken(authToken)
  }
}
