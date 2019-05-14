import gql from 'gql-tag'

export interface UploadSampleMutationInput {
  componentName: string
  sampleName: string
  branch: string
  commit: string
  html: string
  imageUrl?: string
}

export const UploadSampleMutation = gql`
  mutation UploadSampleMutation(
    $componentName: String!
    $sampleName: String!
    $branch: String!
    $commit: String!
    $html: String!
    $imageUrl: String
  ) {
    createRender(
      input: {
        componentName: $componentName
        sampleName: $sampleName
        branch: $branch
        commit: $commit
        html: $html
        imageUrl: $imageUrl
      }
    ) {
      render {
        id
      }
      status {
        success
        errors {
          field
          message
        }
      }
    }
  }
`

export interface UploadSampleMutationResponse {
  createRender: {
    render?: {
      id: string
    }
    status: {
      success: boolean
      errors?: {
        field: string
        message: string
      }
    }
  }
}
