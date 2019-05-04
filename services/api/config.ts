import absolutePath from 'api/lib/absolutePath'

export type Environment = 'production' | 'development'
const environment: Environment =
  process.env.NODE_ENV === 'development' ? 'development' : 'production'

const config = {
  domain: process.env.DOMAIN || 'api.reflexui.com',
  environment,
  figmaClientId: 'EO68f7Vfj53SlHlAr4Pudo',
  figmaClientSecret: process.env.FIGMA_CLIENT_SECRET!,
  gcpProjectId: 'reflex-236915',
  githubAppId: 26484,
  githubAppWebhookPath: '/api/github',
  githubAppWebhookSecret: process.env.GITHUB_APP_WEBHOOK_SECRET!,
  githubAppPrivateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
  githubAuthClientId: process.env.GITHUB_AUTH_CLIENT_ID!,
  githubAuthClientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET!,
  googleAnalyticsId: environment === 'production' ? 'UA-137693546-1' : '',
  graphqlEndpoint: '/graphql',
  graphqlSchemaPath: absolutePath('graphql/schema/index.graphql'),
  graphqlSchemaTypesPath: absolutePath('gen.ts'),
  port: parseInt(process.env.PORT!),
  secretKey: process.env.SECRET_KEY!,
  ssl: process.env.SSL !== 'false',
  uiUrl: process.env.UI_URL || 'https://www.reflexui.com',
}

for (const [key, value] of Object.entries(config)) {
  if (value === undefined || value === null) {
    throw new Error(`Missing config value for ${key.toUpperCase()}`)
  }
}

export default config
