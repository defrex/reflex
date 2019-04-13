import { gitInfo } from './git'
import graphqlRequest from './lib/graphqlRequest'
import spinnerOp from './lib/spinnerOp'
import { RenderSampleToDocument, Sample, SampleRenderFn } from './types'

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
        run: async () => (sample.document = await renderer(sample.render))
      })
    }
  }

  async upload() {
    const { branch, commit } = await gitInfo()
    for (const sample of this.samples) {
      await spinnerOp({
        text: `Rendering ${this.componentName}/${sample.name}`,
        test: async () => ({ success: !!sample.document }),
        run: async () => {
          const response = await graphqlRequest({
            variables: {
              input: {
                componentName: this.componentName,
                sampleName: sample.name,
                html: sample.document,
                branch,
                commit
              }
            },
            query: `
              mutation UploadSampleMutation (
                $sampleId: ID!
                $html: String!
                $branch: String!
                $commit: String!
                $imageUrl: String
              ) {
                createRender(input: {
                  sampleId: $sampleId
                  html: $html
                  branch: $branch
                  commit: $commit
                  imageUrl: $imageUrl
                }) {
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
          })
          if (!response.data.status.success) {
            throw new Error(response.data.status.errors)
          }
        }
      })
    }
  }
}
