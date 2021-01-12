import axios, { AxiosInstance, AxiosResponse, AxiosError, Method } from 'axios'
import { IncomingHttpHeaders } from 'http'
import { MidtransError } from './midtransError'
import { RequestOptions } from '../types/HttpClient'

/**
 * Wrapper of Axios to do API request to Midtrans API
 * @return {Promise} of API response, or exception during request
 * capable to do HTTP `request`
 */

export class HttpClient {
	private readonly parent: Record<string, any>
	private readonly httpClient: AxiosInstance
	private readonly headers: IncomingHttpHeaders
	private readonly requestBody?: any
	private readonly requestParam?: any

	constructor(options: Record<string, any> = {}) {
		this.parent = options
		this.httpClient = axios.create()
		this.headers = {
			'content-type': 'application/json',
			'accept': 'application/json',
			'user-agent': 'midtransclient-nodejs/1.2.1'
		}
		this.requestBody = {}
		this.requestParam = {}
	}

	public request<T extends RequestOptions>(options: T | Record<any, any> = {}): Promise<T> {
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
			// Reject if body is not JSON
			if (typeof requestBody === 'string' || Object.keys(requestBody).length < 1) {
				try {
					requestBody = JSON.parse(requestBody)
				} catch (err) {
					reject(
						new MidtransError({
							message: `fail to parse 'body parameters' string as JSON. Use JSON string or Object as 'body parameters'. with message: ${err}`
						})
					)
				}
			}

			// Reject if param is not JSON
			if (typeof requestParam === 'string' || Object.keys(requestParam).length < 1) {
				try {
					requestParam = JSON.parse(requestParam)
				} catch (err) {
					reject(
						new MidtransError({
							message: `fail to parse 'query parameters' string as JSON. Use JSON string or Object as 'query parameters'. with message: ${err}`
						})
					)
				}
			}

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
				if (res.data.hasOwnProperty('status_code') && res.data.status_code >= 400 && res.data.status_code !== 407) {
					// 407 is expected get-status API response for `expire` transaction, non-standard
					reject(
						new MidtransError({
							message: `Midtrans API is returning API error. HTTP status code: ${res.data.status_code}.
							API response: ${JSON.stringify(res.data)}`,
							httpStatusCode: res.data.status_code,
							ApiResponse: res.data,
							rawHttpClientData: res
						})
					)
				}

				// Result Axios Response To Client
				resolve(res.data)
			} catch (err) {
				let { response }: AxiosError = err

				if (typeof response !== 'undefined' && response.status >= 400) {
					// Reject API error HTTP status code
					reject(
						new MidtransError({
							message: `Midtrans API is returning API error. HTTP status code: ${response.status}.
							API response: ${JSON.stringify(response.data)}`,
							httpStatusCode: response.status,
							ApiResponse: response.data,
							rawHttpClientData: response
						})
					)
				} else if (typeof response === 'undefined') {
					// Reject API undefined HTTP response
					reject(
						new MidtransError({
							message: 'Midtrans API request failed. HTTP response not found, likely connection failure'
						})
					)
				}

				// Throw Error Response
				reject(response)
			}
		})
	}
}
