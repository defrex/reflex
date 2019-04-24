#!/bin/env node

require('./lib/setup')

const run = require('bin/lib/run').default
const gen = require('bin/lib/gen').default

run(['prisma', 'generate']).then(gen)
