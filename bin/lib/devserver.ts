import absolutePath from 'bin/lib/absolutePath'
import { ChildProcess, spawn } from 'child_process'
import chokidar from 'chokidar'
import colors from 'colors'
import ora from 'ora'

type ProcType = 'api' | 'ui'

let count = 0
const procs: { [key in ProcType]?: ChildProcess } = {}
const ports = {
  ui: process.env.UI_PORT || 8080,
  api: process.env.API_PORT || 3030,
}

function killProc(type: ProcType): Promise<void> {
  const proc = procs[type]
  if (!proc) {
    return Promise.resolve()
  }
  return new Promise((resolve, _reject) => {
    proc.on('exit', () => {
      resolve()
    })
    proc.kill()
  })
}

async function spawnProc(type: ProcType): Promise<void> {
  const spinner = ora(
    `Booting ${type.toUpperCase()} ${colors.dim(`${count++}`)}`,
  )
  spinner.start()

  let proc = procs[type]

  if (proc && !proc.killed) {
    await killProc(type)
  }

  procs[type] = spawn(absolutePath(`services/${type}/bin/start.js`), {
    stdio: ['inherit', 'pipe', 'inherit'],
    cwd: absolutePath(`services/${type}`),
    env: {
      ...process.env,
      PORT: ports[type].toString(),
      API_ENDPOINT: `http://localhost:${ports.api}/graphql`,
    },
  })
  procs[type]!.on('exit', () => (spinner.isSpinning ? spinner.fail() : null))
  process.on('exit', () => procs[type] && procs[type]!.kill())

  return new Promise((resolve, _reject) => {
    procs[type] &&
      procs[type]!.stdout.on('data', (data) => {
        if (data.toString('utf8').includes(`http://localhost:${ports[type]}`)) {
          spinner.succeed()
          resolve()
        }
        process.stdout.write(data)
      })
  })
}

export default async function main() {
  try {
    await spawnProc('api')
  } catch (e) {}
  await spawnProc('ui')

  // const apiRespawnQueue = Promise.resolve()
  chokidar
    .watch(
      [absolutePath('services/api/*.ts'), absolutePath('services/api/**/*.ts')],
      { ignoreInitial: true },
    )
    .on('all', () => spawnProc('api'))
}
