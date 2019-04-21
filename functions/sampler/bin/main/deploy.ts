import run from '../lib/run'
import uploadPackage from '../lib/uploadPackage'

export async function main() {
  const uri = await uploadPackage()
  await run([
    'gcloud',
    'functions',
    'deploy',
    'sampler',
    '--project=reflex-236915',
    `--source=${uri}`,
  ])
}
