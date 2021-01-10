module.exports = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/tests/**/*.{test.ts, spec.ts}', '<rootDir>/__tests__/**/*.{test.ts, spec.ts}'],
  collectCoverageFrom: ['src/libs/**/*.ts'],
  testPathIgnorePatterns: ['node_modules/', '__test__/', 'dist/', 'esm', 'tsconfig.json'],
  coveragePathIgnorePatterns: ['node_modules/', '__test__/', 'dist/', 'esm/', 'tsconfig.json']
}
