import { exists as _exists, readFile as _readFile } from 'fs'
import { componentSet } from 'src/componentSet'
import { promisify } from 'util'
import { gitInfo } from './git'
import client from './lib/client'
import spinnerOp from './lib/spinnerOp'
import { Sample, SampleArgs } from './Sample'
import { SampleRenderFn } from './types'

const readFile = promisify(_readFile)
const exists = promisify(_exists)

export class Component {
  public samples: Array<Sample> = []
  public savedSamples: Array<Sample> = []

  constructor(public name: string, public filename: string) {}

  get length(): number {
    return this.samples.length
  }

  get saveFilename() {
    return this.filename
      .split('.')
      .slice(0, -1)
      .concat(['reflex', 'json'])
      .join('.')
  }

  add(name: string, sampleRenderFn: SampleRenderFn): Component {
    this.samples.push(new Sample({ componentName: this.name, name, sampleRenderFn }))
    return this
  }

  find(name: string) {
    for (const sample of this.samples) {
      if (sample.name === name) {
        return sample
      }
    }
  }

  async render() {
    for (const sample of this.samples) {
      await spinnerOp({
        text: `Rendering ${this.name}/${sample.name}`,
        run: async () => {
          sample.render()
        },
      })
    }
  }

  async loadSaved() {
    if (await exists(this.saveFilename)) {
      const sampleData: SampleArgs[] = JSON.parse(await readFile(this.saveFilename, 'utf-8'))
      this.savedSamples = sampleData.map((sample) => new Sample(sample))
    }
  }

  async upload() {
    const { branch, commit } = await gitInfo()

    for (const sample of this.samples) {
      await spinnerOp({
        text: `Uploading ${this.name}/${sample.name}`,
        run: async () => {
          const response = await client.uploadSample({
            componentName: this.name,
            sampleName: sample.name,
            html: sample.document!,
            branch,
            commit,
          })
          if (!response.createRender.status.success) {
            console.error(response.createRender.status.errors)
            throw new Error('Unexpected GraphQL Error')
          }
        },
      })
    }
  }
}

let currentFilename: string
export function setCurrentlyFilename(filename: string) {
  currentFilename = filename
}

export function samplesOf(componentName: string): Component {
  const component = new Component(componentName, currentFilename)
  componentSet.add(component)
  return component
}
