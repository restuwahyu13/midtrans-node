module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['<rootDir>/test/**/*.{test.ts, spec.ts}', '<rootDir>/__test__/**/*.{test.ts, spec.ts}'],
	collectCoverageFrom: ['src/lib/**/*.ts'],
	testPathIgnorePatterns: ['node_modules/', '__test__/', 'dist/', 'esm', 'tsconfig.json'],
	coveragePathIgnorePatterns: ['node_modules/', '__test__/', 'dist/', 'esm/', 'tsconfig.json']
}
