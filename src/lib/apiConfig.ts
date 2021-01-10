import _ from 'lodash'
import { ApiConfigOptions, APIConfig } from '../types/ApiConfig'

export class ApiConfig {
	private static CORE_SANDBOX_BASE_URL = 'https://api.sandbox.midtrans.com/v2'
	private static CORE_PRODUCTION_BASE_URL = 'https://api.midtrans.com/v2'
	private static SNAP_SANDBOX_BASE_URL = 'https://app.sandbox.midtrans.com/snap/v1'
	private static SNAP_PRODUCTION_BASE_URL = 'https://app.midtrans.com/snap/v1'
	private static IRIS_SANDBOX_BASE_URL = 'https://app.sandbox.midtrans.com/iris/api/v1'
	private static IRIS_PRODUCTION_BASE_URL = 'https://app.midtrans.com/iris/api/v1'
	private isProduction: boolean
	private serverKey: string
	private clientKey: string

	/**
	 * Initiate with options
	 * @param  {Object} options - should have these props:
	 * isProduction, serverKey, clientKey
	 */

	constructor({ ...options }: ApiConfigOptions) {
		this.isProduction = false
		this.serverKey = ''
		this.clientKey = ''
		this.set(options)
	}

	/**
	 * Return config stored
	 * @return {Object} object contains isProduction, serverKey, clientKey
	 */

	get(): APIConfig {
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

	set<T extends ApiConfigOptions>({ ...options }: T): void {
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

	getCoreApiBaseUrl(): string {
		return this.isProduction ? ApiConfig.CORE_PRODUCTION_BASE_URL : ApiConfig.CORE_SANDBOX_BASE_URL
	}

	/**
	 * @return {String} snap api base url
	 */

	getSnapApiBaseUrl(): string {
		return this.isProduction ? ApiConfig.SNAP_PRODUCTION_BASE_URL : ApiConfig.SNAP_SANDBOX_BASE_URL
	}

	/**
	 * @return {String} Iris api base url
	 */

	getIrisApiBaseUrl(): string {
		return this.isProduction ? ApiConfig.IRIS_PRODUCTION_BASE_URL : ApiConfig.IRIS_SANDBOX_BASE_URL
	}
}
