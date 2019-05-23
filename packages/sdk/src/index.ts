import cli from './cli'
export { samplesOf } from './Component'
export { ReflexClient } from './lib/ReflexClient'
export { run } from './runner'
export * from './types'

if (!module.parent) {
  cli().catch(console.error)
}
