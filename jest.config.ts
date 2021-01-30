import { Config } from '@jest/types'

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js'],
	testMatch: ['<rootDir>/test/**/*.{test.ts, spec.ts}', '<rootDir>/__test__/**/*.{test.ts, spec.ts}'],
	collectCoverageFrom: ['src/lib/**/*'],
	testPathIgnorePatterns: ['node_modules/', 'dist/', 'esm', 'tsconfig.json', 'coverage/'],
	coveragePathIgnorePatterns: ['node_modules/', 'dist/', 'esm/', 'tsconfig.json', 'coverage/']
}

export default config
