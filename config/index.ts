import * as path from 'path'

const basePath: string = path.join(__dirname, '..')

export default {
  appName: 'Sync UI',
  basePath,
  graphqlSchemaPath: path.join(basePath, 'api/schema.graphql'),
  graphqlSchemaTypesPath: path.join(basePath, 'api/gen/schema.d.ts'),
  graphqlEndpoint: '/graphql',
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  ssl: !!process.env.SSL,
  domain: process.env.DOMAIN,
  dbUrl: process.env.DATABASE_URL,
  secretKey: process.env.SECRET_KEY,
  figmaClientId: 'EO68f7Vfj53SlHlAr4Pudo',
  figmaClientSecret: process.env.FIGMA_CLIENT_SECRET,
}
