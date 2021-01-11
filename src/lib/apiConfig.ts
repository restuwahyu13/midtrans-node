import _ from 'lodash'
import { ApiConfigOptions, ApiConfigGetter } from '../types/ApiConfig'

export class ApiConfig {
	private static readonly CORE_SANDBOX_BASE_URL = 'https://api.sandbox.midtrans.com/v2'
	private static readonly CORE_PRODUCTION_BASE_URL = 'https://api.midtrans.com/v2'
	private static readonly SNAP_SANDBOX_BASE_URL = 'https://app.sandbox.midtrans.com/snap/v1'
	private static readonly SNAP_PRODUCTION_BASE_URL = 'https://app.midtrans.com/snap/v1'
	private static readonly IRIS_SANDBOX_BASE_URL = 'https://app.sandbox.midtrans.com/iris/api/v1'
	private static readonly IRIS_PRODUCTION_BASE_URL = 'https://app.midtrans.com/iris/api/v1'
	private isProduction: boolean
	private serverKey: string
	private clientKey: string

	/**
	 * Initiate with options
	 * @param  {Object} options - should have these props:
	 * isProduction, serverKey, clientKey
	 */

	constructor(options?: ApiConfigOptions) {
		this.isProduction = false
		this.serverKey = ''
		this.clientKey = ''
		const { isProduction, serverKey, clientKey } = this
		options ? this.set(options) : this.set({ isProduction, serverKey, clientKey })
	}

	/**
	 * Return config stored
	 * @return {Object} object contains isProduction, serverKey, clientKey
	 */

	public get(): ApiConfigGetter {
		const currentConfig: ApiConfigOptions = {
			isProduction: this.isProduction,
			serverKey: this.serverKey,
			clientKey: this.clientKey
		}
		return currentConfig
	}

	/**
	 * Set config stored
	 * @param {Object} options - object contains isProduction, serverKey, clientKey]
	 */

	public set<T extends ApiConfigOptions>(options: T | Record<string, any> = {}): void {
		const currentConfig: ApiConfigOptions = {
			isProduction: this.isProduction,
			serverKey: this.serverKey,
			clientKey: this.clientKey
		}

		const parsedOptions = _.pick(options, ['isProduction', 'serverKey', 'clientKey'])
		const mergedConfig = _.merge({}, currentConfig, parsedOptions)

		this.isProduction = mergedConfig.isProduction
		this.serverKey = mergedConfig.serverKey
		this.clientKey = mergedConfig.clientKey
	}

	/**
	 * @return {String} core api base url
	 */

	public getCoreApiBaseUrl(): string {
		return this.isProduction ? ApiConfig.CORE_PRODUCTION_BASE_URL : ApiConfig.CORE_SANDBOX_BASE_URL
	}

	/**
	 * @return {String} snap api base url
	 */

	public getSnapApiBaseUrl(): string {
		return this.isProduction ? ApiConfig.SNAP_PRODUCTION_BASE_URL : ApiConfig.SNAP_SANDBOX_BASE_URL
	}

	/**
	 * @return {String} Iris api base url
	 */

	public getIrisApiBaseUrl(): string {
		return this.isProduction ? ApiConfig.IRIS_PRODUCTION_BASE_URL : ApiConfig.IRIS_SANDBOX_BASE_URL
	}
}
