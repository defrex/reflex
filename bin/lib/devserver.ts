import absolutePath from 'bin/lib/absolutePath'
import { ChildProcess, spawn } from 'child_process'
import chokidar from 'chokidar'
import ora from 'ora'

type ProcName = 'api' | 'ui' | 'sdk' | 'sampler'
type ProcType = 'service' | 'package' | 'function'
type Config<T> = { [key in ProcType]?: { [key in ProcName]?: T } }

const ports: Config<string> = {
  service: {
    ui: process.env.UI_PORT || `${8080}`,
    api: process.env.API_PORT || `${3030}`,
  },
}

const env: Config<{ [key: string]: string }> = {
  package: {
    sdk: {
      REFLEX_API_ENDPOINT: `http://localhost:${ports.service!.api!}/graphql`,
    },
  },
  service: {
    ui: {
      ...process.env,
      PORT: ports.service!.ui!,
      API_ENDPOINT: `http://localhost:${ports.service!.api!}/graphql`,
    },
    api: {
      ...process.env,
      PORT: ports.service!.api!,
      UI_URL: `http://localhost:${ports.service!.ui!}`,
    },
  },
}

const procs: { [key: string]: ChildProcess } = {}
const getProc = (type: ProcType, name: ProcName): ChildProcess | void =>
  procs[`${type}/${name}`]
const setProc = (type: ProcType, name: ProcName, proc: ChildProcess) =>
  (procs[`${type}/${name}`] = proc)

function killProc(type: ProcType, name: ProcName): Promise<void> {
  const proc = getProc(type, name)
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

async function spawnProc(type: ProcType, name: ProcName): Promise<void> {
  const spinner = ora(`${type}s/${name} `)
  spinner.start()

  await killProc(type, name)

  const proc = spawn('yarn', ['start'], {
    stdio: ['inherit', 'inherit', 'pipe'],
    cwd: absolutePath(`${type}s/${name}`),
    env: env[type] && env[type]![name] ? env[type]![name] : {},
  })
  proc.on('exit', () => (spinner.isSpinning ? spinner.fail() : null))
  process.on('exit', () => killProc(type, name))

  setProc(type, name, proc)

  return new Promise((resolve, _reject) => {
    proc.stderr.on('data', (data) => {
      if (
        spinner.isSpinning &&
        (!ports[type] ||
          !ports[type]![name] ||
          (ports[type] &&
            ports[type]![name] &&
            data
              .toString('utf8')
              .includes(`http://localhost:${ports[type]![name]}`)))
      ) {
        spinner.succeed()
        resolve()
        process.stderr.write(data)
      } else if (!spinner.isSpinning) {
        process.stderr.write(data)
      }
    })
  })
}

export default async function main() {
  await spawnProc('package', 'sdk')
  await spawnProc('function', 'sampler')
  await spawnProc('service', 'api')
  await spawnProc('service', 'ui')

  chokidar
    .watch(
      [absolutePath('services/api/*.ts'), absolutePath('services/api/**/*.ts')],
      { ignoreInitial: true },
    )
    .on('all', () => spawnProc('service', 'api'))
}
