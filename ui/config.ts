// CAUTION:
// All values here are available in-browser
// New ENV vars must be exposed via webpack

export default {
  ssl: process.env.SSL === 'true',
  domain: process.env.DOMAIN!,
  port: parseInt(process.env.PORT!),
  graphqlEndpoint: '/api/graphql',
  env: process.env.ENV,
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
}
