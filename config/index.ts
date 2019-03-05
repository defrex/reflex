import * as path from 'path'

const basePath: string = path.join(__dirname, '..')

export default {
  appName: 'Sync UI',
  basePath,
  graphqlSchemaPath: path.join(basePath, 'api/schema.graphql'),
  graphqlSchemaTypesPath: path.join(basePath, 'api/gen/schema.d.ts'),
  graphqlEndpoint: '/graphql',
  port: 8080,
  environment: 'development',
  ssl: false,
  domain: 'localhost:8080',
  dbHost: 'localhost',
  dbPort: 5432,
  dbUsername: 'pguser',
  dbPassword: 'pgpass',
  dbName: 'syncui',
  figmaClientId: 'EO68f7Vfj53SlHlAr4Pudo',
  secretKey: process.env.SECRET_KEY,
  figmaClientSecret: process.env.FIGMA_CLIENT_SECRET,
}
