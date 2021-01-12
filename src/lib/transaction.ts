import { ApiConfig } from './apiConfig'
import { HttpClient } from './httpClient'

/**
 * These are wrapper/implementation of API methods described on:
 * https://api-docs.midtrans.com/#midtrans-api
 * @return {Promise} - Promise that contains JSON API response decoded as Object
 */

export class Transaction {
	private readonly parent: Record<string, any>
	private readonly apiConfig: ApiConfig
	private readonly httpClient: HttpClient

	constructor(options?: Record<string, any> = {}) {
		this.parent = options
		this.apiConfig = new ApiConfig()
		this.httpClient = new HttpClient()
	}

	public status(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/status'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'get',
			serverKey: this.apiConfig.get().serverKey
		})
		return responsePromise
	}

	public statusb2b(transactionId = ''): Promise<Record<string, any>> {
		let apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/statusb2b'
		let responsePromise = this.httpClient.request<Record<string, any>>(
			'get',
			this.apiConfig.get().serverKey,
			apiUrl,
			null
		)
		return responsePromise
	}

	public approve(transactionId = ''): Promise<Record<string, any>> {
		let apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/approve'
		let responsePromise = this.httpClient.request<Record<string, any>>(
			'post',
			this.apiConfig.get().serverKey,
			apiUrl,
			null
		)
		return responsePromise
	}

	public deny(transactionId: string): Promise<Record<string, any>> {
		let apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/deny'
		let responsePromise = this.httpClient.request<Record<string, any>>(
			'post',
			this.apiConfig.get().serverKey,
			apiUrl,
			null
		)
		return responsePromise
	}

	public cancel(transactionId: string): Promise<Record<string, any>> {
		let apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/cancel'
		let responsePromise = this.httpClient.request<Record<string, any>>(
			'post',
			this.apiConfig.get().serverKey,
			apiUrl,
			null
		)
		return responsePromise
	}

	public expire(transactionId = ''): Promise<Record<string, any>> {
		let apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/expire'
		let responsePromise = this.httpClient.request<Record<string, any>>(
			'post',
			this.apiConfig.get().serverKey,
			apiUrl,
			null
		)
		return responsePromise
	}

	public refund(transactionId = '', parameter = {}): Promise<Record<string, any>> {
		let apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/refund'
		let responsePromise = this.httpClient.request<Record<string, any>>(
			'post',
			this.apiConfig.get().serverKey,
			apiUrl,
			parameter
		)
		return responsePromise
	}

	public refundDirect(transactionId = '', parameter = {}): Promise<Record<string, any>> {
		let apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/refund/online/direct'
		let responsePromise = this.httpClient.request<Record<string, any>>(
			'post',
			this.apiConfig.get().serverKey,
			apiUrl,
			parameter
		)
		return responsePromise
	}

	public notification(notificationObj = {}): Promise<Record<string, any>> {
		return new Promise(function (resolve, reject) {
			if (typeof notificationObj === 'string' || notificationObj instanceof String) {
				try {
					notificationObj = JSON.parse(notificationObj)
				} catch (err) {
					reject(
						new MidtransNotificationError(
							'fail to parse `notification` string as JSON. Use JSON string or Object as `notification`. with message:' +
								err.message
						)
					)
				}
			}
			let transactionId = notificationObj.transaction_id
			this.status(transactionId)
				.then(function (res) {
					resolve(res)
				})
				.catch(function (err) {
					reject(err)
				})
		})
	}
}

class MidtransNotificationError extends Error {}
