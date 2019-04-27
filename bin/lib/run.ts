import absolutePath from 'bin/lib/absolutePath'
import chalk from 'chalk'
import { spawn } from 'child_process'

const BASE_PATH: string = absolutePath('/')

export default async function run(
  command: string[],
  cwd?: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const bin = command.shift() as string
    const args = command

    console.log(chalk.yellow('Executing...'))
    console.log(chalk.dim(`${bin} ${args.join(' ')}`))

    spawn(bin, args, {
      stdio: 'inherit',
      cwd: cwd || BASE_PATH,
      shell: true,
    }).on('close', (code: number) => {
      if (code === 0) {
        console.log(chalk.green('Complete'))
        resolve()
      } else {
        reject(new Error(chalk.red(`return code ${code}`)))
      }
    })
  })
}
