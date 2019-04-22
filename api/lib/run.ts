import { spawn } from 'child_process'
import colors from 'colors'
import { absolutePath } from './path'

const BASE_PATH: string = absolutePath('/')

export default async function run(
  command: string[],
  cwd?: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const bin = command.shift() as string
    const args = command

    console.log(colors.yellow('Executing...'))
    console.log(colors.dim(`${bin} ${args.join(' ')}`))

    spawn(bin, args, {
      stdio: 'inherit',
      cwd: cwd || BASE_PATH,
      shell: true,
    }).on('close', (code: number) => {
      if (code === 0) {
        console.log(colors.green('Complete'))
        resolve()
      } else {
        reject(new Error(colors.red(`return code ${code}`)))
      }
    })
  })
}
