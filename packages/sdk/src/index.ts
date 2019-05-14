import cli from './cli'
export { ReflexClient } from './lib/ReflexClient'
export { run } from './runner'
export { samplesOf } from './SampleSet'
export * from './types'

if (!module.parent) {
  cli().catch(console.error)
}
