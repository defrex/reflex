const config = require('./api/config').default

module.exports = {
  type: 'postgres',
  url: config.databaseUrl,
  synchronize: true,
  logging: false,
  entities: ['api/models/*.ts'],
  migrations: ['api/migration/*.ts'],
  subscribers: ['api/subscriber/*.ts'],
  cli: {
    entitiesDir: 'api/models',
    migrationsDir: 'api/migration',
    subscribersDir: 'api/subscriber',
  },
}
