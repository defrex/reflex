import absolutePath from 'bin/lib/absolutePath'
import { ChildProcess, spawn } from 'child_process'
import chokidar from 'chokidar'
import ora from 'ora'

type ProcName = 'api' | 'ui' | 'sdk' | 'sampler'
type ProcType = 'service' | 'package' | 'function'
type Config<T> = { [key in ProcType]?: { [key in ProcName]?: T } }

const NODE_ENV = process.env.NODE_ENV || 'development'

const ports: Config<string> = {
  service: {
    ui: process.env.UI_PORT || `${8080}`,
    api: process.env.API_PORT || `${3030}`,
  },
}

const env: Config<{ [key: string]: string }> = {
  package: {
    sdk: {
      NODE_ENV,
    },
  },
  function: {
    sampler: {
      NODE_ENV,
    },
  },
  service: {
    ui: {
      ...process.env,
      PORT: ports.service!.ui!,
      API_URL: `http://localhost:${ports.service!.api!}`,
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
const delProc = (type: ProcType, name: ProcName) =>
  delete procs[`${type}/${name}`]

function killProc(type: ProcType, name: ProcName): Promise<void> {
  const proc = getProc(type, name)
  if (!proc || proc.killed) {
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

  spinner.text = `${type}s/${name} killing `
  await killProc(type, name)

  spinner.text = `${type}s/${name} spawning`
  const proc = spawn('yarn', ['start'], {
    stdio: ['inherit', 'inherit', 'pipe'],
    cwd: absolutePath(`${type}s/${name}`),
    env: env[type] && env[type]![name] ? env[type]![name] : {},
  })
  proc.on('exit', () => {
    if (spinner.isSpinning) {
      spinner.fail()
    }
    delProc(type, name)
  })

  setProc(type, name, proc)

  spinner.text = `${type}s/${name} waiting`
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
        spinner.succeed(`${type}s/${name} `)
        resolve()
      }
      process.stderr.write(data)
    })
  })
}

process.on('exit', function killAll() {
  for (const proc of Object.values(procs)) {
    proc.kill()
  }
})

export default async function main() {
  spawnProc('package', 'sdk')
  spawnProc('function', 'sampler')
  spawnProc('service', 'api')
  spawnProc('service', 'ui')

  chokidar
    .watch(
      [absolutePath('services/api/*.ts'), absolutePath('services/api/**/*.ts')],
      { ignoreInitial: true },
    )
    .on('all', () => spawnProc('service', 'api'))

  chokidar
    .watch(absolutePath('services/ui/bin/lib/server.ts'), {
      ignoreInitial: true,
    })
    .on('all', () => spawnProc('service', 'ui'))
}
