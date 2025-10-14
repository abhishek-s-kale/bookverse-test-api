/** @type
 {import('ts-jest).JestConfigwithTSJest } */
 // jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'], // Specify the root directory for tests
  modulefileExtensions: ['ts', 'js', 'json'], // File extensions to consider
  // Optional: Define where Jest should look for test files
   globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.json',
        },
      },
  testMatch: ['**/tests/**/*.test.ts'], 
  verbose: true,
};