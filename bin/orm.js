#!/usr/bin/env node

require('./lib/setup').then(() => {
  require('typeorm/cli')
})
