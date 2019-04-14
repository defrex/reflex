import applyApiMiddleware from 'api'
import config from 'api/config'
import express from 'express'

export default async function main() {
  const app = express()
  await applyApiMiddleware(app)
  app.listen(config.devApiPort, () => {
    process.stdout.write(config.devApiReadyIndicator)
  })
}
