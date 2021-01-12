import { ApiConfig } from './apiConfig'
import { HttpClient } from './httpClient'
import { RefundRequest, RefundDRequest } from '../types/transaction'

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

	/**
	 * Get information status of a transaction with certain order_id | transaction_id
	 * @param transactionId
	 * @return Promise
	 */

	public status(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/status'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'get',
			serverKey: this.apiConfig.get().serverKey
		})
		return responsePromise
	}

	/**
	 * Get information status of multiple B2B transactions related to certain order_id | transaction_id
	 * @param transactionId
	 * @return Promise
	 */

	public statusb2b(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/statusb2b'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'get',
			serverKey: this.apiConfig.get().serverKey
		})
		return responsePromise
	}

	/**
	 * Approve a transaction with certain order_id | transaction_id which gets challenge status from Fraud Detection System
	 * @param transactionId
	 * @return Promise
	 */

	public approve(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/approve'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey
		})
		return responsePromise
	}

	/**
	 * Deny a transaction with certain order_id | transaction_id which gets challenge status from Fraud Detection System
	 * @param transactionId
	 * @return Promise
	 */

	public deny(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/deny'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey
		})
		return responsePromise
	}

	/**
	 * Cancel a transaction with certain order_id | transaction_id Cancelation can only be done before settlement process
	 * @param transactionId
	 * @return Promise
	 */

	public cancel(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/cancel'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey
		})
		return responsePromise
	}

	/**
	 * 	Update order_id | transaction_id with pending status to be expired
	 * @param transactionId
	 * @return Promise
	 */

	public expire(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/expire'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey
		})
		return responsePromise
	}

	/**
	 * 	Update order_id | transaction_id with settlement status to be refund
	 * @param transactionId
	 * @param parameter - optional
	 * @return Promise
	 */

	public refund<T extends RefundRequest>(
		transactionId: string,
		parameter?: T | Record<any, any> = {}
	): Promise<Record<string, any>> {
		const apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/refund'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: parameter
		})
		return responsePromise
	}

	/**
	 * Attempt to send refund to bank or payment provider and update the transaction status to refund if it succeeded
	 * @param transactionId
	 * @param parameter - optional
	 * @return Promise
	 */

	public refundDirect<T extends RefundDRequest>(
		transactionId: string,
		parameter?: T | Record<any, any> = {}
	): Promise<Record<string, any>> {
		const apiUrl = this.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/refund/online/direct'
		const responsePromise = this.httpClient.request<Record<string, any>>({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.apiConfig.get().serverKey,
			requestPayload: parameter
		})
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
			const transactionId = notificationObj.transaction_id
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
