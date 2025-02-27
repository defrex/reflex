import gql from 'gql-tag'
import { GraphQLClient } from 'graphql-request'
import {
  UploadSampleMutation,
  UploadSampleMutationInput,
  UploadSampleMutationResponse,
} from './mutations/UploadSampleMutation'

const REFLEX_ENDPOINT = process.env.REFLEX_API_ENDPOINT || 'https://api.reflexui.com/graphql'

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

  hello() {
    return this.request(gql`
      query Hello {
        hello
      }
    `)
  }

  async uploadSample(input: UploadSampleMutationInput) {
    return this.request<UploadSampleMutationResponse>(UploadSampleMutation, input)
  }
}
