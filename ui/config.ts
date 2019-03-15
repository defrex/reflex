// CAUTION: all values here are available in-browser
// Expose new env vars in next.config.js

export default {
  ssl: process.env.SSL === 'true',
  domain: process.env.DOMAIN,
  graphqlEndpoint: '/graphql',
}
