import absolutePath from 'bin/lib/absolutePath'
import run from 'bin/lib/run'

export default async function main(functionName: string) {
  await run(['npm', 'run', 'build'], absolutePath(`functions/${functionName}`))
}
