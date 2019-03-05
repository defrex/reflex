import * as path from 'path'

const basePath: string = path.join(__dirname, '..')

export default {
  appName: 'Sync UI',
  basePath,
  graphqlSchemaPath: path.join(basePath, 'api/schema.graphql'),
  graphqlSchemaTypesPath: path.join(basePath, 'api/gen/schema.d.ts'),
  graphqlEndpoint: '/graphql',
  port: process.env.PORT,
  environment: 'development',
  ssl: false,
  domain: 'localhost:8080',
  dbUrl: process.env.DATABASE_URL,
  figmaClientId: 'EO68f7Vfj53SlHlAr4Pudo',
  secretKey: process.env.SECRET_KEY,
  figmaClientSecret: process.env.FIGMA_CLIENT_SECRET,
}
