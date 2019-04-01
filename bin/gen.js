#!/bin/env node

require('./lib/setup')
const run = require('./lib/run').default
run(['prisma', 'generate']).then(() => {
  require('api/lib/gen').default()
})
