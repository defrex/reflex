import express from 'express'
import config from 'src/config'
import { apiRouter } from 'src/server/api'
import { render } from 'src/server/ui/server'

export function startServer(): Promise<void> {
  return new Promise((resolve, _reject) => {
    const app = express()
    app.use(express.json())
    app.use('/api', apiRouter)

    app.get('/', async (req, res) => {
      const content = render()
      res.writeHead(200)
      res.write(content, 'utf8')
    })

    app.listen(config.port, resolve)
  })
}
