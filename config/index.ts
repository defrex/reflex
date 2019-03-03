import * as path from 'path'

import secrets from './secrets'

const basePath: string = path.join(__dirname, '..')

export default {
  appName: 'Sync UI',
  basePath,
  graphqlSchemaPath: path.join(basePath, 'api/schema.graphql'),
  graphqlSchemaTypesPath: path.join(basePath, 'api/gen/schema.d.ts'),
  plaidClientId: '5c61ae6e6b79360011eb2b93',
  plaidPublicKey: 'bf785f2abeb9bea89229da5f8f5587',
  plaidEnv: 'sandbox',
  graphqlEndpoint: '/graphql',
  port: 8080,
  environment: 'development',
  ssl: false,
  domain: 'localhost:8080',
  ...secrets,
}
