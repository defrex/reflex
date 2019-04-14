import { absolutePath } from 'api/lib/path'
import run from 'api/lib/run'

export default async function buildInfo(stats: any) {
  console.log(stats)
  await run(['pwd'])
  await run(['find', absolutePath('dist')])
  await run(['find', absolutePath('public/dist')])
}
