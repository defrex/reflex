const { resolve } = require('path')

process.chdir(resolve(`${__dirname}/../../`))

require('module-alias/register')
require('reflect-metadata')

if (process.env.NODE_ENV === 'development') {
  require('ts-node/register')
} else {
  require('ts-node/register/transpile-only')
}
