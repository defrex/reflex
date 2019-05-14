import { createServer } from 'http'
import config from '../config'
import { renderReport } from './renderReport'

export function startServer(): Promise<void> {
  return new Promise((resolve, _reject) => {
    const server = createServer()
    server.on('request', async (req, res) => {
      try {
        const content = await renderReport()
        res.writeHead(200)
        res.write(content, 'utf8')
      } catch (e) {
        res.writeHead(500)
        res.write(e.message, 'utf8')
        console.error(e)
      }
      res.end()
    })
    server.listen({ port: config.port }, resolve)
  })
}
