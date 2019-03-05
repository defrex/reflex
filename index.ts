import * as next from 'next'

import config from 'config'
import api from 'api'

const nextApp = next({
  dev: config.environment === 'development',
})
const nextHandler = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  api.use((req, res, next) => {
    if (req.path.startsWith(config.graphqlEndpoint)) {
      return next()
    }

    nextHandler(req, res, next)
  })

  api.start({
    endpoint: config.graphqlEndpoint,
    playground: config.graphqlEndpoint,
    port: config.port,
  }).catch(err => console.log('ERROR:', err))
})
