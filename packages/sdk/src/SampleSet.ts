import gql from 'gql-tag'
import { gitInfo } from './git'
import client from './lib/client'
import spinnerOp from './lib/spinnerOp'
import { RenderSampleToDocument, Sample, SampleRenderFn } from './types'

const UploadSampleMutation = gql`
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
interface UploadSampleMutationResponse {
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

export class SampleSet {
  public samples: Array<Sample> = []

  constructor(public componentName: string) {}

  add(name: string, render: SampleRenderFn) {
    this.samples.push({ name, render })
    return this
  }

  async render(renderer: RenderSampleToDocument) {
    for (const sample of this.samples) {
      if (sample.document) {
        break
      }
      await spinnerOp({
        text: `Rendering ${this.componentName}/${sample.name}`,
        run: async () => {
          sample.document = await renderer(sample.render)
        }
      })
    }
  }

  async upload() {
    const { branch, commit } = await gitInfo()
    for (const sample of this.samples) {
      await spinnerOp({
        text: `Uploading ${this.componentName}/${sample.name}`,
        exitOnFail: true,
        run: [
          async () => ({ success: !!sample.document }),
          async () => {
            const response = await client.request<UploadSampleMutationResponse>(
              UploadSampleMutation,
              {
                componentName: this.componentName,
                sampleName: sample.name,
                html: sample.document,
                branch,
                commit
              }
            )
            if (!response.createRender.status.success) {
              console.error(response.createRender.status.errors)
              throw new Error('Unexpected GraphQL Error')
            }
          }
        ]
      })
    }
  }
}
