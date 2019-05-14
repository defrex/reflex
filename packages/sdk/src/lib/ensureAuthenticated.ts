import { getAuthToken } from '../auth'
import store, { AUTH_KEY } from '../store'
import client from './client'

export default async function ensureAuthenticated() {
  let authToken: string | undefined = store.get(AUTH_KEY)
  if (!authToken) {
    authToken = await getAuthToken()
    store.set(AUTH_KEY, authToken)
    client.setAuthToken(authToken)
  }
}
