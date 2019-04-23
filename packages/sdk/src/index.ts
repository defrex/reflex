import cli from './cli'
export { ReflexClient } from './lib/ReflexClient'
export { sampler, SamplerOptions, samplesOf } from './sampler'
export * from './types'

if (!module.parent) {
  cli().catch(console.error)
}
