/** @type
 {import('ts-jest).JestConfigwithTSJest } */

 // jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'], // Specify the root directory for tests
  moduleFileExtensions: ['ts', 'js', 'json'], // File extensions to consider
  // Optional: Define where Jest should look for test files
 transform: {'^.+\\.ts$': ['ts-jest',{useESM:true}]},
 extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['**/tests/**/*.test.ts'], 
  verbose: true,
};