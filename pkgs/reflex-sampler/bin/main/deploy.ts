import run from '../lib/run'
import uploadPackage from '../lib/uploadPackage'

export async function main() {
  await uploadPackage()
  await run([
    'gcloud',
    'functions',
    'deploy',
    'sampler',
    '--project=reflex-236915',
    '--source=gs://reflex-sampler/builds/1555379273973.zip',
  ])
}
