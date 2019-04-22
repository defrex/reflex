import { GraphQLClient } from 'graphql-request'
import config, { AUTH_KEY } from '../config'

export class ReflexClient extends GraphQLClient {
  constructor() {
    super('https://reflexui.com/api/graphql')

    const authToken = config.get(AUTH_KEY)
    if (authToken) {
      this.setAuthToken(authToken)
    }
  }

  setAuthToken(authToken: string) {
    this.setHeader('Authorization', `Bearer ${authToken}`)
  }
}

export default new ReflexClient()
