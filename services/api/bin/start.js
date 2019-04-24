#!/usr/bin/env node

require('module-alias/register')
require('reflect-metadata')

if (process.env.NODE_ENV === 'development') {
  require('ts-node/register')
} else {
  require('ts-node/register/transpile-only')
}

require('../index').default()
