#!/bin/env node

require('./lib/setup')

const run = require('api/lib/run').default
const gen = require('api/lib/gen').default

run(['prisma', 'generate']).then(gen)
