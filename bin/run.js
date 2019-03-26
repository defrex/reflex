#!/usr/bin/env node

require('./lib/setup')

Promise.resolve()
  .then(() => {
    return require(`./scripts/${
      process.argv[process.argv.length - 1]
    }.ts`).default()
  })
  .then(() => {
    process.exit()
  })
