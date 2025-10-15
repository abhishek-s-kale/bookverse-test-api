/** @type
 {import('ts-jest).JestConfigwithTSJest } */

 // jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^\.\./src/(.*)\.js$': '../src/$1.ts',
    '^\.\/src/(.*)\.js$': './src/$1.ts',
  },
  roots: ['<rootDir>/src/tests'], // Specify the root directory for tests
  testMatch: ['**/tests/**/*.test.ts'], 
  verbose: true,
};