import * as path from 'path'

const basePath = path.resolve(__dirname, '..')
const absolutePath = path.join.bind(path, basePath)

const config = {
  appName: 'Sync UI',
  basePath,
  graphqlSchemaPath: absolutePath('api/schema.graphql'),
  graphqlSchemaTypesPath: absolutePath('gen/schema.d.ts'),
  graphqlEndpoint: '/api/graphql',
  graphqlDocumentPaths: [
    absolutePath('pages/**/*.graphql'),
    absolutePath('components/**/*.graphql'),
  ],
  uiPath: absolutePath('ui'),
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT!,
  ssl: process.env.SSL! === 'true',
  domain: process.env.DOMAIN!,
  dbUrl: process.env.DATABASE_URL!,
  secretKey: process.env.SECRET_KEY!,
  figmaClientId: 'EO68f7Vfj53SlHlAr4Pudo',
  figmaClientSecret: process.env.FIGMA_CLIENT_SECRET!,
  githubAppId: 26484,
  githubAppWebhookPath: '/api/github',
  githubAppWebhookSecret: process.env.GITHUB_APP_WEBHOOK_SECRET!,
  githubAppPrivateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
  githubAuthClientId: process.env.GITHUB_AUTH_CLIENT_ID!,
  githubAuthClientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET!,
}

for (const [key, value] of Object.entries(config)) {
  if (value === undefined || value === null) {
    throw new Error(`Missing config value for ${key}`)
  }
}

export default config
