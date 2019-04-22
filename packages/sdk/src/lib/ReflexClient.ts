import { GraphQLClient } from 'graphql-request'

export class ReflexClient extends GraphQLClient {
  constructor(authToken?: string) {
    super('https://reflexui.com/api/graphql')

    if (authToken) {
      this.setAuthToken(authToken)
    }
  }

  setAuthToken(authToken: string) {
    this.setHeader('Authorization', `Bearer ${authToken}`)
  }
}
