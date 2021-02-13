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
	private parsedOptions: any
	private mergedConfig: any

	/**
	 * Initiate with options
	 * @param  {Object} options - should have these props:
	 * isProduction, serverKey, clientKey
	 */

	constructor(options: Partial<ApiConfigOptions> | Record<string, any>) {
		this.isProduction = false
		this.serverKey = ''
		this.clientKey = ''
		this.set(options)
	}

	/**
	 * Return config stored
	 * @return {Object} object contains isProduction, serverKey, clientKey
	 */

	public get(): ReturnType<() => ApiConfigGetter> {
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

	public set<T extends Partial<ApiConfigOptions>>(options: T | Record<any, any>): ReturnType<() => void> {
		const currentConfig: ApiConfigOptions = {
			isProduction: this.isProduction,
			serverKey: this.serverKey,
			clientKey: this.clientKey
		}

		this.parsedOptions = _.pick(options, ['isProduction', 'serverKey', 'clientKey'])
		this.mergedConfig = Object.assign(currentConfig, this.parsedOptions)

		this.isProduction = options ? this.mergedConfig.isProduction : this.isProduction
		this.serverKey = options ? this.mergedConfig.serverKey : this.serverKey
		this.clientKey = options ? this.mergedConfig.clientKey : this.clientKey
	}

	/**
	 * @return {String} core api base url
	 */

	public getCoreApiBaseUrl(): ReturnType<() => string> {
		return this.isProduction ? ApiConfig.CORE_PRODUCTION_BASE_URL : ApiConfig.CORE_SANDBOX_BASE_URL
	}

	/**
	 * @return {String} snap api base url
	 */

	public getSnapApiBaseUrl(): ReturnType<() => string> {
		return this.isProduction ? ApiConfig.SNAP_PRODUCTION_BASE_URL : ApiConfig.SNAP_SANDBOX_BASE_URL
	}

	/**
	 * @return {String} Iris api base url
	 */

	public getIrisApiBaseUrl(): ReturnType<() => string> {
		return this.isProduction ? ApiConfig.IRIS_PRODUCTION_BASE_URL : ApiConfig.IRIS_SANDBOX_BASE_URL
	}
}
