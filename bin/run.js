#!/usr/bin/env node

require('./lib/setup')
  .then(() => {
    return require(`./scripts/${
      process.argv[process.argv.length - 1]
    }.ts`).default()
  })
  .then(() => {
    process.exit()
  })
