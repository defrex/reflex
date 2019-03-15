import * as path from 'path'

const basePath = path.resolve(__dirname, '..')
const absolutePath = path.join.bind(path, basePath)

export default {
  appName: 'Sync UI',
  basePath,
  graphqlSchemaPath: absolutePath('api/schema.graphql'),
  graphqlSchemaTypesPath: absolutePath('gen/schema.d.ts'),
  graphqlEndpoint: '/graphql',
  graphqlDocumentPaths: [
    absolutePath('pages/**/*.graphql'),
    absolutePath('components/**/*.graphql'),
  ],
  uiPath: absolutePath('ui'),
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  ssl: process.env.SSL === 'true',
  domain: process.env.DOMAIN,
  dbUrl: process.env.DATABASE_URL,
  secretKey: process.env.SECRET_KEY,
  figmaClientId: 'EO68f7Vfj53SlHlAr4Pudo',
  figmaClientSecret: process.env.FIGMA_CLIENT_SECRET,
  githubWebhookPath: '/github',
  githubAppId: 26484,
  githubWebhookSecret: process.env.GITHUB_WEBHOOK_SECRET,
  githubPrivateKey: process.env.GITHUB_PRIVATE_KEY,
}
