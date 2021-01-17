import { MidtransClient } from '../src/index'
import { config } from '../config'

describe('MidtransClient', () => {
	let midtransClient

	beforeEach(() => {
		midtransClient = MidtransClient
		jest.resetAllMocks()
	})

	afterAll(() => {
		jest.clearAllMocks()
	})

	it('have Snap class', () => {
		expect(typeof midtransClient.Snap).toStrictEqual('function')
	})

	it('have CoreApi class', () => {
		expect(typeof midtransClient.CoreApi).toStrictEqual('function')
	})

	it('able to create CoreApi instance', () => {
		const core = new midtransClient.CoreApi(generateConfig())
		expect(typeof core).toStrictEqual('object')
		expect(typeof core.apiConfig.get().serverKey).toStrictEqual('string')
		expect(typeof core.apiConfig.get().clientKey).toStrictEqual('string')
		expect(typeof core.apiConfig.get().isProduction).toStrictEqual('boolean')
	})

	it('able to create Snap instance', () => {
		const snap = new midtransClient.Snap(generateConfig())
		expect(typeof snap).toStrictEqual('object')
		expect(typeof snap.apiConfig.get().serverKey).toStrictEqual('string')
		expect(typeof snap.apiConfig.get().clientKey).toStrictEqual('string')
		expect(typeof snap.apiConfig.get().isProduction).toStrictEqual('boolean')
	})

	it('able to create Iris instance', () => {
		const iris = new midtransClient.Iris(generateConfig())
		expect(typeof iris).toStrictEqual('object')
		expect(typeof iris.apiConfig.get().serverKey).toStrictEqual('string')
		expect(typeof iris.apiConfig.get().clientKey).toStrictEqual('string')
		expect(typeof iris.apiConfig.get().isProduction).toStrictEqual('boolean')
	})
})

/**
 * Helper function
 */

function generateConfig() {
	return {
		isProduction: false,
		serverKey: config.serverKey,
		clientKey: config.clientKey
	}
}
