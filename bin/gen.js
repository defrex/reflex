#!/bin/env node

require('./lib/setup')

const run = require('./lib/run').default
const gen = require('api/lib/gen').default

run(['prisma', 'generate']).then(gen)
