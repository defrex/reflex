#!/usr/bin/env node

require('./lib/setup')
require('api/db').default.then(() => {
  require('../index.ts').default()
})
