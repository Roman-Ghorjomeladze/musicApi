/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  roots: ['<rootDir>/src'],
  testMatch: ["**/?(*.)+(spec|test).[jt]s"],
  transform: {
    "^.+\\.(ts)$": "ts-jest"
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1'
  }
};