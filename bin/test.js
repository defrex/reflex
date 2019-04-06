#!/bin/env node
require('./lib/setup')
// require('./lib/recolor')

const run = require('api/lib/run').default

process.env.PRISMA_ENDPOINT = `${process.env.PRISMA_ENDPOINT}/default/test`

async function main() {
  await run(['prisma', 'deploy'])
  try {
    await run(['jest'].concat(process.argv.slice(2)))
  } catch {}
  // Cleanup no matter what
  await run(['prisma', 'reset', '--force'])
}
main()
