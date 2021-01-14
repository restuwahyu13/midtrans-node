import { ApiConfig } from './apiConfig'
import { HttpClient } from './httpClient'
import { Transaction } from './transaction'
import {
	CoreApiOptions,
	ChargeTypeRequest,
	CaptureRequest,
	CardRegisterRequest,
	CardTokenRequest
} from '../types/CoreApi'

/**
 * CoreApi Midtrans is a RESTful Web Service served as a communication bridge between merchants and our payment channels.
 */

export class CoreApi {
	/**
	 * Initiate with options
	 * @param  {Object} options - should have these props:
	 * isProduction, serverKey, clientKey
	 */

	public readonly apiConfig: ApiConfig
	public readonly httpClient: HttpClient
	public readonly transaction: Transaction

	constructor(options: CoreApiOptions | Record<string, any> = {}) {
		this.apiConfig = new ApiConfig(options)
		this.httpClient = new HttpClient(this)
		this.transaction = new Transaction(this)
	}

	/**
	 * Perform a transaction with various available payment methods and features. Example given: Credit Card Charge.
	 * @param  parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public charge<T extends ChargeTypeRequest>(parameter: T | Record<any, any> = {}): Promise<Record<string, any>> {
		const apiUrl: string = this.apiConfig.getCoreApiBaseUrl() + '/charge'
		const responsePromise = this.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: Object.values(parameter)[0]
		})
		return responsePromise
	}

	/**
	 *  Capture an authorized transaction for card payment
	 * @param parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public capture<T extends CaptureRequest>(parameter: T | Record<any, any>): Promise<Record<string, any>> {
		const apiUrl: string = this.apiConfig.getCoreApiBaseUrl() + '/capture'
		const responsePromise = this.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: parameter
		})
		return responsePromise
	}

	/**
	 * Register card information (card number and expiry) to be used for two clicks and one click
	 * @param parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public cardRegister<T extends CardRegisterRequest>(
		parameter: T | Record<any, any> = {}
	): Promise<Record<string, any>> {
		const apiUrl: string = this.apiConfig.getCoreApiBaseUrl() + '/card/register'
		const responsePromise = this.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'get',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: parameter
		})
		return responsePromise
	}

	/**
	 * Tokenize Credit Card information before being charged
	 * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public cardToken<T extends CardTokenRequest>(parameter: T | Record<any, any> = {}): Promise<Record<string, any>> {
		const apiUrl: string = this.apiConfig.getCoreApiBaseUrl() + '/token'
		const responsePromise = this.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'get',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: parameter
		})
		return responsePromise
	}

	/**
	 * Get the point balance of the card in denomination amount
	 * @param  {String} tokenId - tokenId of credit card (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public cardPointInquiry(tokenId: string | number): Promise<Record<string, any>> {
		const apiUrl: string = this.apiConfig.getCoreApiBaseUrl() + '/point_inquiry/' + tokenId
		const responsePromise = this.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey
		})
		return responsePromise
	}
}
