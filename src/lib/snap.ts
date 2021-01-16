import { ApiConfig } from './apiConfig'
import { HttpClient } from './httpClient'
import { Transaction } from './transaction'
import { matchSnap } from '../utils/matchSnap'
import { TransactionRequestType, SnapOptions } from '../types/snap'
/**
 * Snap object used to do request to Midtrans Snap API
 */

export class Snap {
	public readonly apiConfig: InstanceType<typeof ApiConfig>
	public readonly httpClient: InstanceType<typeof HttpClient>
	public readonly transaction: InstanceType<typeof Transaction>

	constructor(options: SnapOptions | Record<string, any> = {}) {
		this.apiConfig = new ApiConfig(options)
		this.httpClient = new HttpClient(this)
		this.transaction = new Transaction(this)
	}

	/**
	 * Do `/transactions` API request to Snap API
	 * @param parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://snap-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public createTransaction<T extends TransactionRequestType>(
		parameter: T | Record<any, any> = {}
	): Promise<Record<string, any>> {
		const apiUrl = this.apiConfig.getSnapApiBaseUrl() + '/transactions'
		const responsePromise = this.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload:
				parameter === null || parameter === undefined
					? parameter
					: !matchSnap(Object.keys(parameter)[0])
					? parameter
					: Object.values(parameter)[0]
		})
		return responsePromise
	}

	/**
	 * Wrapper function that call `createTransaction` then:
	 * @return {Promise} - Promise of String token
	 */

	public createTransactionToken<T extends TransactionRequestType>(
		parameter: T | Record<any, any> = {}
	): Promise<string> {
		const requestPayload =
			parameter === null || parameter === undefined
				? parameter
				: !matchSnap(Object.keys(parameter)[0])
				? parameter
				: Object.values(parameter)[0]
		return this.createTransaction(requestPayload).then((res) => res.token)
	}

	/**
	 * Wrapper function that call `createTransaction` then:
	 * @return {Promise} - Promise of String redirect_url
	 */

	public createTransactionRedirectUrl<T extends TransactionRequestType>(
		parameter: T | Record<any, any> = {}
	): Promise<string> {
		const requestPayload =
			parameter === null || parameter === undefined
				? parameter
				: !matchSnap(Object.keys(parameter)[0])
				? parameter
				: Object.values(parameter)[0]
		return this.createTransaction(requestPayload).then((res) => res.redirect_url)
	}
}
