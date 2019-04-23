#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
require('./lib/setup')
require('./lib/deployFunctions.ts').default(argv)
