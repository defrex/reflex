import yargs from 'yargs'
import { gitInfo } from './git'
import clearAuthentication from './lib/clearAuthentication'
import ensureAuthenticated from './lib/ensureAuthenticated'

export default async function cli() {
  const argv = yargs
    .scriptName('reflex')
    .command('login', 'Sets up local auth', {}, async (argv: any) => {
      await ensureAuthenticated()
    })
    .command('logout', 'Clears local auth', {}, async (argv: any) => {
      await clearAuthentication()
    })
    .command('git-info', false, {}, async (argv: any) => {
      console.log(await gitInfo())
    })
    .demandCommand(1)
    .showHelpOnFail(true)
    .help().argv
}
