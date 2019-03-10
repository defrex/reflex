// CAUTION: assume all values here are available in-browser

export default {
  ssl: !!process.env.SSL,
  domain: process.env.DOMAIN,
  graphqlEndpoint: '/graphql',
}
