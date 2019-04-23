import { GraphQLClient } from 'graphql-request'

const REFLEX_ENDPOINT = process.env.REFLEX_ENDPOINT || 'https://reflexui.com/api/graphql'

export class ReflexClient extends GraphQLClient {
  constructor(authToken?: string) {
    super(REFLEX_ENDPOINT)

    if (authToken) {
      this.setAuthToken(authToken)
    }
  }

  setAuthToken(authToken: string) {
    this.setHeader('Authorization', `Bearer ${authToken}`)
  }
}
