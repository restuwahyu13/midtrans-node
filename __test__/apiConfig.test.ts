import { isType } from 'is-any-type'
import { ApiConfig as MidtransConfigApi } from '../src/lib/apiConfig'
import { config } from '../config'

describe('ApiConfig', () => {
	let apiConfig

	beforeEach(() => {
		jest.resetAllMocks()

		apiConfig = new MidtransConfigApi({
			isProduction: false,
			clientKey: config.clientKey,
			serverKey: config.serverKey
		})
	})

	afterAll(() => {
		jest.clearAllMocks()
	})

	it('able to store config', () => {
		const spyApiConfig = jest.spyOn(apiConfig, 'get')
		apiConfig.get()
		expect(spyApiConfig).toHaveBeenCalled()
		expect(spyApiConfig).toHaveBeenCalledTimes(1)
		expect(apiConfig.get().isProduction).toBeFalsy()
		expect(isType(apiConfig.get().serverKey)).toStrictEqual('string')
		expect(isType(apiConfig.get().clientKey)).toStrictEqual('string')
		expect(apiConfig.get().serverKey).toStrictEqual(config.serverKey)
		expect(apiConfig.get().clientKey).toStrictEqual(config.clientKey)
	})

	it('able to set config', () => {
		const spyApiConfig = jest.spyOn(apiConfig, 'set')
		apiConfig.set({ isProduction: true, clientKey: config.clientKey, serverKey: config.serverKey })
		expect(spyApiConfig).toHaveBeenCalled()
		expect(spyApiConfig).toHaveBeenCalledTimes(1)
		expect(apiConfig.get().isProduction).toBeTruthy()
		expect(isType(apiConfig.get().serverKey)).toStrictEqual('string')
		expect(isType(apiConfig.get().clientKey)).toStrictEqual('string')
	})

	it('able to get correct API url environtment for Core Api', () => {
		const spyApiConfig = jest.spyOn(apiConfig, 'set')
		apiConfig.set({ isProduction: false })
		expect(spyApiConfig).toHaveBeenCalled()
		expect(spyApiConfig).toHaveBeenCalledTimes(1)
		expect(apiConfig.getCoreApiBaseUrl()).toStrictEqual(config.CORE_SANDBOX_BASE_URL)
		apiConfig.set({ isProduction: true })
		expect(apiConfig.getCoreApiBaseUrl()).toStrictEqual(config.CORE_PRODUCTION_BASE_URL)
	})

	it('able to get correct API url environtment for Snap', () => {
		const spyApiConfig = jest.spyOn(apiConfig, 'set')
		apiConfig.set({ isProduction: false })
		expect(spyApiConfig).toHaveBeenCalled()
		expect(spyApiConfig).toHaveBeenCalledTimes(1)
		expect(apiConfig.getSnapApiBaseUrl()).toStrictEqual(config.SNAP_SANDBOX_BASE_URL)
		apiConfig.set({ isProduction: true })
		expect(apiConfig.getSnapApiBaseUrl()).toStrictEqual(config.SNAP_PRODUCTION_BASE_URL)
	})
})
