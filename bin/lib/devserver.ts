import absolutePath from 'bin/lib/absolutePath'
import chalk, { Chalk } from 'chalk'
import { ChildProcess, spawn } from 'child_process'
import chokidar from 'chokidar'
import debounce from 'lodash/debounce'
import get from 'lodash/get'
import { Readable, Writable } from 'stream'

type ProcName = 'api' | 'ui' | 'sdk' | 'sampler' | 'easy-run'
type ProcType = 'service' | 'package' | 'function'
type Status = 'neutral' | 'success' | 'start' | 'fail'
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

const env: Config<{ [key: string]: string }> = {
  package: {
    sdk: {
      ...process.env,
      NODE_ENV,
    },
    'easy-run': {
      ...process.env,
      NODE_ENV,
    },
  },
  function: {
    sampler: {
      ...process.env,
      NODE_ENV,
    },
  },
  service: {
    ui: {
      ...process.env,
      PORT: ports.service!.ui!,
      API_URL: `http://localhost:${ports.service!.api!}`,
      // API_URL: 'https://api.reflexui.com',
    },
    api: {
      ...process.env,
      PORT: ports.service!.api!,
      UI_URL: `http://localhost:${ports.service!.ui!}`,
    },
  },
}

interface State {
  procs: {
    [key: string]: ChildProcess
  }
  currentTitleProc: null | {
    type: ProcType
    name: ProcName
  }
}

const state: State = {
  procs: {},
  currentTitleProc: null,
}

const title = (type: ProcType, name: ProcName, status: Status = 'neutral') => {
  const baseColor = get(colors, [type, name], chalk.dim)
  const symbol =
    status === 'success'
      ? chalk.green('✔')
      : status === 'fail'
      ? chalk.red('✖')
      : status === 'start'
      ? chalk.yellow('↻')
      : '↴'
  return baseColor(`[${type}s/${name} ${symbol}]`)
}

function titleStream(
  type: ProcType,
  name: ProcName,
  input: Readable,
  output: Writable,
) {
  input.on('data', (data) => {
    if (
      !state.currentTitleProc ||
      state.currentTitleProc.type !== type ||
      state.currentTitleProc.name !== name
    ) {
      console.log(title(type, name))
      state.currentTitleProc = { type, name }
    }
    output.write(data)
  })
}

function titleLog(type: ProcType, name: ProcName, status: Status) {
  console.log(title(type, name, status))
  state.currentTitleProc = null
}

const getProc = (type: ProcType, name: ProcName): ChildProcess | void =>
  state.procs[`${type}/${name}`]
const setProc = (type: ProcType, name: ProcName, proc: ChildProcess) =>
  (state.procs[`${type}/${name}`] = proc)
const delProc = (type: ProcType, name: ProcName) =>
  delete state.procs[`${type}/${name}`]

function killProc(type: ProcType, name: ProcName): Promise<boolean> {
  const proc = getProc(type, name)
  if (!proc || proc.killed) {
    return Promise.resolve(false)
  }
  return new Promise((resolve, _reject) => {
    proc.on('exit', () => {
      resolve(true)
    })
    proc.kill()
  })
}

async function spawnProc(type: ProcType, name: ProcName): Promise<void> {
  let loaded = false

  if (await killProc(type, name)) {
    titleLog(type, name, 'start')
  }

  const proc = spawn('npm', ['run', 'start'], {
    stdio: ['inherit', 'pipe', 'pipe'],
    cwd: absolutePath(`${type}s/${name}`),
    env: env[type] && env[type]![name] ? env[type]![name] : {},
  })
  titleStream(type, name, proc.stderr, process.stderr)
  titleStream(type, name, proc.stdout, process.stdout)
  proc.on('exit', () => {
    titleLog(type, name, 'fail')
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
        titleLog(type, name, 'success')
        loaded = true
        resolve()
      }
    })
  })
}

process.on('exit', function killAll() {
  for (const proc of Object.values(state.procs)) {
    proc.kill()
  }
})

export default async function main() {
  spawnProc('package', 'sdk')
  spawnProc('package', 'easy-run')
  spawnProc('function', 'sampler')
  spawnProc('service', 'api')
  spawnProc('service', 'ui')

  chokidar
    .watch(
      [absolutePath('services/api/*.ts'), absolutePath('services/api/**/*.ts')],
      { ignoreInitial: true },
    )
    .on(
      'all',
      debounce(() => spawnProc('service', 'api'), 1000, {
        leading: true,
        trailing: true,
      }),
    )

  chokidar
    .watch(absolutePath('services/ui/bin/lib/server.ts'), {
      ignoreInitial: true,
    })
    .on(
      'all',
      debounce(() => spawnProc('service', 'ui'), 1000, {
        leading: true,
        trailing: true,
      }),
    )
}
