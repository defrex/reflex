import { absolutePath } from 'api/lib/path'
import run from 'api/lib/run'

export default async function main(functionName: string) {
  await run(['yarn', 'build'], absolutePath(`functions/${functionName}`))
}
