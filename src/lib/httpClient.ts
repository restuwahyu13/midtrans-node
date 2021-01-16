import axios, { AxiosInstance, AxiosResponse, Method } from 'axios'
import { Snap } from '../lib/snap'
import { CoreApi } from '../lib/coreApi'
import { Iris } from '../lib/iris'
import { IncomingHttpHeaders } from 'http'
import { MidtransError } from './midtransError'
import { RequestOptions } from '../types/HttpClient'

/**
 * Wrapper of Axios to do API request to Midtrans API
 * @return {Promise} of API response, or exception during request
 * capable to do HTTP `request`
 */

export class HttpClient {
	private readonly parent: InstanceType<typeof Snap> | InstanceType<typeof CoreApi> | InstanceType<typeof Iris>
	private readonly httpClient: AxiosInstance
	private readonly headers: IncomingHttpHeaders
	private readonly requestBody?: any
	private readonly requestParam?: any

	constructor(options: ThisType<any> | Record<string, any> = {}) {
		this.parent = options as InstanceType<typeof Snap> | InstanceType<typeof CoreApi> | InstanceType<typeof Iris>
		this.httpClient = axios.create()
		this.headers = {
			'content-type': 'application/json',
			'accept': 'application/json',
			'user-agent': 'midtransclient-nodejs/1.2.1'
		}
		this.requestBody = {}
		this.requestParam = {}
	}

	public request<T extends Partial<RequestOptions>>(options: T | Record<any, any>): Promise<Record<string, any>> {
		const headers = this.headers

		let requestBody = this.requestBody
		let requestParam = this.requestParam

		if (options.httpMethod.toLowerCase() === 'get') {
			// GET http request will use first available param as URL Query param
			requestParam = options.requestPayload
		} else {
			// Non GET http request will use first available param as JSON payload body
			requestBody = options.requestPayload
		}
		return new Promise(async (resolve, reject) => {
			if (typeof requestBody === 'string' || typeof requestParam === 'string') {
				// Reject if body is not JSON
				try {
					requestBody = JSON.parse(requestBody)
					requestParam = JSON.parse(requestParam)
				} catch (err) {
					reject(
						new MidtransError({
							message: `fail to parse 'body parameters' string as JSON. Use JSON string or Object as 'body parameters'. with message: ${err} \n response: ${requestBody}`
						})
					)
				}
			}

			// else if (typeof requestParam === 'string') {
			// 	// Reject if param is not JSON
			// 	try {
			// 		requestParam = JSON.parse(requestParam)
			// 	} catch (err) {
			// 		reject(
			// 			new MidtransError({
			// 				message: `fail to parse 'query parameters' string as JSON. Use JSON string or Object as 'query parameters'. with message: ${err} \n response: ${requestParam}`
			// 			})
			// 		)
			// 	}
			// }

			// Fetching data from server
			try {
				const res: AxiosResponse = await axios({
					method: options.httpMethod as Method,
					headers: headers,
					url: options.requestUrl,
					data: requestBody,
					params: requestParam,
					auth: { username: options.serverKey, password: '' }
				})

				// Reject core API error status code
				if (res.data.hasOwnProperty('status_code') && res.data.status_code >= 400 && res.data.status_code != 407) {
					// 407 is expected get-status API response for `expire` transaction, non-standard
					reject(
						new MidtransError({
							message: `Midtrans API is returning API error. \n HTTP status code: ${
								res.data.status_code
							}. \n API response: ${JSON.stringify(res.data)}`,
							httpStatusCode: res.data.status_code,
							ApiResponse: res.data,
							rawHttpClientData: res
						})
					)
				}

				// Result Axios Response To Client
				resolve(res.data)
			} catch (err) {
				let res = err.response

				if (typeof res !== 'undefined' && res.status >= 400) {
					// Reject API error HTTP status code
					reject(
						new MidtransError({
							message: `Midtrans API is returning API error. \n HTTP status code: ${
								res.status
							}. \n API response: ${JSON.stringify(res.data)}`,
							httpStatusCode: res.status,
							ApiResponse: res.data,
							rawHttpClientData: res
						})
					)
				}

				// else if (typeof res === 'undefined') {
				// 	// Reject API undefined HTTP response
				// 	reject(
				// 		new MidtransError({
				// 			message: 'Midtrans API request failed. HTTP response not found, likely connection failure'
				// 		})
				// 	)
				// }

				// Throw Error Response
				reject(res)
			}
		})
	}
}
