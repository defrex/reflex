import run from 'api/lib/run'
import absolutePath from 'bin/lib/absolutePath'

export default async function main(functionName: string) {
  await run(['yarn', 'build'], absolutePath(`functions/${functionName}`))
}
