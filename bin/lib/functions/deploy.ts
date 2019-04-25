import absolutePath from 'bin/lib/absolutePath'
import run from 'bin/lib/run'

export default async function main(functionName: string, uri: string) {
  await run(
    [
      'gcloud',
      'functions',
      'deploy',
      functionName,
      '--project=reflex-236915',
      `--source=${uri}`,
    ],
    absolutePath(`functions/${functionName}`),
  )
}
