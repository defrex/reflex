import absolutePath from 'bin/lib/absolutePath'
import chalk, { Chalk } from 'chalk'
import { ChildProcess, spawn } from 'child_process'
import chokidar from 'chokidar'
import get from 'lodash/get'
import ora from 'ora'

ora('test').fail()

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

const colors: Config<Chalk> = {
  service: {
    api: chalk.blue.dim,
    ui: chalk.cyan.dim,
  },
}
const color = (type: ProcType, name: ProcName) =>
  get(colors, [type, name], chalk.dim)

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
  let loaded = false
  const title = color(type, name)(`[${type}s/${name}] `)

  console.log(title, chalk.yellow('↻'))

  await killProc(type, name)

  const proc = spawn('yarn', ['start'], {
    stdio: ['inherit', 'pipe', 'pipe'],
    cwd: absolutePath(`${type}s/${name}`),
    env: env[type] && env[type]![name] ? env[type]![name] : {},
  })
  proc.stderr.on('data', (data) => {
    process.stderr.write(title)
    process.stderr.write(data)
  })
  proc.stdout.on('data', (data) => {
    process.stdout.write(title)
    process.stdout.write(data)
  })
  proc.on('exit', () => {
    console.log(title, chalk.red('✖'))
    loaded = true
    delProc(type, name)
  })

  setProc(type, name, proc)

  return new Promise((resolve, _reject) => {
    proc.stderr.on('data', (data) => {
      if (
        !loaded &&
        (!get(ports, [type, name]) ||
          (get(ports, [type, name]) &&
            data
              .toString('utf8')
              .includes(`http://localhost:${ports[type]![name]}`)))
      ) {
        console.log(title, chalk.green('✔'))
        loaded = true
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
