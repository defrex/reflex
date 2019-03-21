#!/usr/bin/env node

require('./lib/setup').then(() => {
  require('../index.ts').default()
})
