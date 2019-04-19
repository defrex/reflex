import config from 'api/config'
import { ChildProcess, spawn } from 'child_process'
import chokidar from 'chokidar'
import { NextFunction, Request, Response } from 'express'
import httpProxy from 'http-proxy'
import debounce from 'lodash/debounce'
import ora from 'ora'
import { absolutePath } from './path'

let devApiProc: ChildProcess
function killApiServer(): Promise<void> {
  return new Promise((resolve, _reject) => {
    devApiProc.on('exit', () => {
      resolve()
    })
    devApiProc.kill()
  })
}

async function spawnApiServer(): Promise<ChildProcess> {
  const spinner = ora('Starting API')
  spinner.start()

  if (devApiProc && !devApiProc.killed) {
    await killApiServer()
  }

  devApiProc = spawn(absolutePath('bin/dev-api.js'), {
    stdio: ['inherit', 'pipe', 'inherit'],
  })
  process.on('exit', () => devApiProc.kill())

  return new Promise((resolve, _reject) => {
    devApiProc.stdout!.on('data', (data) => {
      if (data.toString('utf8') === config.devApiReadyIndicator) {
        resolve(devApiProc)
        spinner.succeed()
      } else {
        process.stdout.write(data)
      }
    })
  })
}

export default async function setupDevApiServer() {
  await spawnApiServer()

  const respawnQueue = Promise.resolve()
  chokidar
    .watch(absolutePath('api/**/*.ts'), { ignoreInitial: true })
    .on('all', debounce(() => respawnQueue.then(spawnApiServer), 1000))

  const proxy = httpProxy.createProxyServer({
    target: `http://localhost:${config.devApiPort}`,
  })

  return function apiDevMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (!req.path.startsWith('/api/')) {
      return next()
    }
    proxy.web(req, res)
  }
}
