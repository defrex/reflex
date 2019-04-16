import { spawn } from 'child_process'
import * as colors from 'colors'

export default async function run(command: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const bin = command.shift() as string
    const args = command

    console.log(colors.yellow('Executing...'))
    console.log(colors.dim(`${bin} ${args.join(' ')}`))

    spawn(bin, args, { stdio: 'inherit', shell: true }).on('close', (code: number) => {
      if (code === 0) {
        console.log(colors.green('Complete'))
        resolve()
      } else {
        reject(new Error(colors.red(`return code ${code}`)))
      }
    })
  })
}
