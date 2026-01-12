import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  clearMocks: true,
  moduleNameMapper: {
    '^common/(.*)$': '<rootDir>/common/$1',
    '^types/(.*)$': '<rootDir>/types/$1',
    '^core/(.*)$': '<rootDir>/core/$1',
    '^modules/(.*)$': '<rootDir>/modules/$1',
    '^testUtils$': '<rootDir>/src/testUtils',
  },
};

export default createJestConfig(customJestConfig);
