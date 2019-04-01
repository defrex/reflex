module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^api/(.*)$': '<rootDir>/api/$1',
    '^ui/(.*)$': '<rootDir>/ui/$1',
  },
}
