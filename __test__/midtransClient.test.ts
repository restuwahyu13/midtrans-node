import { isType } from 'is-any-type'
import { MidtransClient } from '../src/index'
import { config } from '../config'

describe('MidtransClient', () => {
	let midtransClient

	beforeEach(() => {
		jest.resetAllMocks()
		jest.setTimeout(50000)
		midtransClient = MidtransClient
	})

	afterAll(() => {
		jest.clearAllMocks()
		jest.clearAllTimers()
	})

	it('have Snap class', () => {
		expect(isType(midtransClient.Snap)).toStrictEqual('function')
	})

	it('have CoreApi class', () => {
		expect(isType(midtransClient.CoreApi)).toStrictEqual('function')
	})

	it('able to create CoreApi instance', () => {
		const core = new midtransClient.CoreApi(generateConfig())
		expect(isType(core)).toStrictEqual('object')
		expect(isType(core.apiConfig.get().serverKey)).toStrictEqual('string')
		expect(isType(core.apiConfig.get().clientKey)).toStrictEqual('string')
		expect(isType(core.apiConfig.get().isProduction)).toStrictEqual('boolean')
	})

	it('able to create Snap instance', () => {
		const snap = new midtransClient.Snap(generateConfig())
		expect(isType(snap)).toStrictEqual('object')
		expect(isType(snap.apiConfig.get().serverKey)).toStrictEqual('string')
		expect(isType(snap.apiConfig.get().clientKey)).toStrictEqual('string')
		expect(isType(snap.apiConfig.get().isProduction)).toStrictEqual('boolean')
	})

	it('able to create Iris instance', () => {
		const iris = new midtransClient.Iris(generateConfig())
		expect(isType(iris)).toStrictEqual('object')
		expect(isType(iris.apiConfig.get().serverKey)).toStrictEqual('string')
		expect(isType(iris.apiConfig.get().clientKey)).toStrictEqual('string')
		expect(isType(iris.apiConfig.get().isProduction)).toStrictEqual('boolean')
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
