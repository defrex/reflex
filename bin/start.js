#!/usr/bin/env node

require('module-alias/register')
require('ts-node/register')
require('reflect-metadata')

const main = require('../index.ts').default

if (require.main === module) {
  main()
}
