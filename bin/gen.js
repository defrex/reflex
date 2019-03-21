#!/bin/env node

require('./lib/setup').then(() => {
  require('api/lib/gen').default()
})
