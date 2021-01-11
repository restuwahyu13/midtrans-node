import { ApiConfig } from './apiConfig'
import { HttpClient } from './httpClient'
import { CoreApiOptions, ChargeRequest, CaptureRequest } from '../types/CoreApi'
/**
 * CoreApi object able to do API request to Midtrans Core API
 */

export class CoreApi {
	/**
	 * Initiate with options
	 * @param  {Object} options - should have these props:
	 * isProduction, serverKey, clientKey
	 */

	private readonly apiConfig: ApiConfig
	private readonly httpClient: HttpClient

	constructor(options: CoreApiOptions) {
		this.apiConfig = new ApiConfig(options)
		this.httpClient = new HttpClient(this)
		// this.transaction = new Transaction(this)
	}

	/**
	 * Do `/charge` API request to Core API
	 * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public charge(parameter: ChargeRequest): Promise<Record<string, any>> {
		const apiUrl: string = this.apiConfig.getCoreApiBaseUrl() + '/charge'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: parameter
		})
		return responsePromise
	}

	/**
	 * Do `/capture` API request to Core API
	 * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public capture(parameter: CaptureRequest): Promise<Record<string, any>> {
		const apiUrl: string = this.apiConfig.getCoreApiBaseUrl() + '/capture'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: parameter
		})
		return responsePromise
	}

	/**
	 * Do `/card/register` API request to Core API
	 * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public cardRegister(parameter = {}): Promise<Record<string, any>> {
		const apiUrl: string = this.apiConfig.getCoreApiBaseUrl() + '/card/register'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'get',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: parameter
		})
		return responsePromise
	}

	/**
	 * Do `/token` API request to Core API
	 * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public cardToken(parameter = {}): Promise<Record<string, any>> {
		const apiUrl: string = this.apiConfig.getCoreApiBaseUrl() + '/token'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'get',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: parameter
		})
		return responsePromise
	}

	/**
	 * Do `/point_inquiry/<tokenId>` API request to Core API
	 * @param  {String} tokenId - tokenId of credit card (more params detail refer to: https://api-docs.midtrans.com)
	 * @return {Promise} - Promise contains Object from JSON decoded response
	 */

	public cardPointInquiry(tokenId: string | number): Promise<any> {
		const apiUrl: string = this.apiConfig.getCoreApiBaseUrl() + '/point_inquiry/' + tokenId
		const responsePromise = this.httpClient.request<any>({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey
		})
		return responsePromise
	}
}
