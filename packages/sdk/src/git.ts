import { spawn } from 'child_process'

async function run(command: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args)

    let out = ''
    proc.stdout.on('data', data => (out += data))

    let err = ''
    proc.stderr.on('data', data => (err += data))

    proc.on('close', code => {
      if (code !== 0) {
        reject(err.trim())
      } else {
        resolve(out.trim())
      }
    })
  })
}

interface GitInfo {
  branch: string
  commit: string
}

export async function gitInfo(): Promise<GitInfo> {
  const branch = await run('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
  const commit = await run('git', ['rev-parse', '--verify', 'HEAD'])
  return {
    branch,
    commit
  }
}
