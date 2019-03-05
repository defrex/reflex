import * as path from 'path'
import { promisify } from 'util'
import { spawn } from 'child_process'
import * as colors from 'colors'

const BASE_PATH: string = path.join(__dirname, '..');

export async function run(command: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const bin = command.shift()
    const args = command

    console.log(colors.yellow('Executing...'))
    console.log(colors.dim(`${bin} ${args.join(' ')}`))

    spawn(bin, args, {stdio: 'inherit', cwd: BASE_PATH, shell: true})
      .on('close', (code: number) => {
        if (code === 0) {
          console.log(colors.green('Complete'))
          resolve()
        } else {
          reject()
        }
      })
  })
}
