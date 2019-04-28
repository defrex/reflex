module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^api/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/bin/test.js',
    '<rootDir>/bin/lib/test.ts',
    '<rootDir>/node_modules/',
  ],
}
