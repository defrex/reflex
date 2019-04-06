#!/bin/env node
require('./lib/setup')

const run = require('api/lib/run').default

process.env.PRISMA_ENDPOINT = `${process.env.PRISMA_ENDPOINT}/default/test`

async function main() {
  await run(['prisma', 'deploy'])
  await run(['prisma', 'reset', '--force'])
  run(['jest'].concat(process.argv.slice(2)))
}
main()
