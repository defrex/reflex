const config = require('./config').default

module.exports = {
  'type': 'postgres',
  'host': config.dbHost,
  'port': config.dbPort,
  'username': config.dbUsername,
  'password': config.dbPassword,
  'database': config.dbName,
  'synchronize': true,
  'logging': false,
  'entities': [
    'api/models/**/*.ts',
  ],
  'migrations': [
    'api/migration/**/*.ts',
  ],
  'subscribers': [
    'api/subscriber/**/*.ts',
  ],
  'cli': {
    'entitiesDir': 'api/models',
    'migrationsDir': 'api/migration',
    'subscribersDir': 'api/subscriber',
  },
}
