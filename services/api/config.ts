import absolutePath from 'api/lib/absolutePath'

export type Environment = 'production' | 'development'
const environment: Environment =
  process.env.NODE_ENV === 'development' ? 'development' : 'production'

const config = {
  graphqlSchemaPath: absolutePath('graphql/schema/index.graphql'),
  graphqlSchemaTypesPath: absolutePath('gen.ts'),
  graphqlEndpoint: '/graphql',
  environment,
  port: parseInt(process.env.PORT!),
  ssl: process.env.SSL !== 'false',
  domain: process.env.DOMAIN || 'api.reflexui.com',
  secretKey: process.env.SECRET_KEY!,
  figmaClientId: 'EO68f7Vfj53SlHlAr4Pudo',
  figmaClientSecret: process.env.FIGMA_CLIENT_SECRET!,
  githubAppId: 26484,
  githubAppWebhookPath: '/api/github',
  githubAppWebhookSecret: process.env.GITHUB_APP_WEBHOOK_SECRET!,
  githubAppPrivateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
  githubAuthClientId: process.env.GITHUB_AUTH_CLIENT_ID!,
  githubAuthClientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET!,
  googleAnalyticsId: environment === 'production' ? 'UA-137693546-1' : '',
  gcpProjectId: 'reflex-236915',
}

for (const [key, value] of Object.entries(config)) {
  if (value === undefined || value === null) {
    throw new Error(`Missing config value for ${key.toUpperCase()}`)
  }
}

export default config
