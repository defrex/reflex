import { gitInfo } from './git'
import ensureAuthenticated from './lib/ensureAuthenticated'

export default async function cli() {
  console.log('Hello CLI!')
  await ensureAuthenticated()
  await gitInfo()
}
