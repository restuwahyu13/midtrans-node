import { Snap } from './snap'
import { RefundRequest, TransactionOptions } from '../types/transaction'

/**
 * These are wrapper/implementation of API methods described on:
 * https://api-docs.midtrans.com/#midtrans-api
 * @return {Promise} - Promise that contains JSON API response decoded as Object
 */

export class Transaction {
	private readonly parent: Snap

	constructor(options: TransactionOptions | Record<string, any> = {}) {
		this.parent = options as Snap
	}

	/**
	 * Get information status of a transaction with certain order_id | transaction_id
	 * @param transactionId
	 * @return Promise
	 */

	public status(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/status'
		const responsePromise = this.parent.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'get',
			serverKey: this.parent.apiConfig.get().serverKey,
			requestPayload: null
		})

		return responsePromise
	}

	/**
	 * Get information status of multiple B2B transactions related to certain order_id | transaction_id
	 * @param transactionId
	 * @return Promise
	 */

	public statusb2b(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/statusb2b'
		const responsePromise = this.parent.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'get',
			serverKey: this.parent.apiConfig.get().serverKey,
			requestPayload: null
		})
		return responsePromise
	}

	/**
	 * Approve a transaction with certain order_id | transaction_id which gets challenge status from Fraud Detection System
	 * @param transactionId
	 * @return Promise
	 */

	public approve(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/approve'
		const responsePromise = this.parent.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.parent.apiConfig.get().serverKey,
			requestPayload: null
		})
		return responsePromise
	}

	/**
	 * Deny a transaction with certain order_id | transaction_id which gets challenge status from Fraud Detection System
	 * @param transactionId
	 * @return Promise
	 */

	public deny(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/deny'
		const responsePromise = this.parent.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.parent.apiConfig.get().serverKey,
			requestPayload: null
		})
		return responsePromise
	}

	/**
	 * Cancel a transaction with certain order_id | transaction_id Cancelation can only be done before settlement process
	 * @param transactionId
	 * @return Promise
	 */

	public cancel(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/cancel'
		const responsePromise = this.parent.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.parent.apiConfig.get().serverKey,
			requestPayload: null
		})
		return responsePromise
	}

	/**
	 * 	Update order_id | transaction_id with pending status to be expired
	 * @param transactionId
	 * @return Promise
	 */

	public expire(transactionId: string): Promise<Record<string, any>> {
		const apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/expire'
		const responsePromise = this.parent.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.parent.apiConfig.get().serverKey,
			requestPayload: null
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
		parameter?: T | Record<any, any>
	): Promise<Record<string, any>> {
		const apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/refund'
		const responsePromise = this.parent.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.parent.apiConfig.get().serverKey,
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

	public refundDirect<T extends RefundRequest>(
		transactionId: string,
		parameter?: T | Record<any, any>
	): Promise<Record<string, any>> {
		const apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/refund/online/direct'
		const responsePromise = this.parent.httpClient.request({
			requestUrl: apiUrl,
			httpMethod: 'post',
			serverKey: this.parent.apiConfig.get().serverKey,
			requestPayload: parameter
		})
		return responsePromise
	}

	/**
	 * An additional mechanism we provide to verify the content and the origin of the notification is to challenge. This can be achieved by calling the get status API. The response is the same as the notification status.
	 * @param notification
	 * @return Promise
	 */

	public notification(notification: Record<string, any> = {}): Promise<any> {
		let self = this
		return new Promise(function (resolve, reject) {
			if (typeof notification === 'string') {
				try {
					notification = JSON.parse(notification)
				} catch (err) {
					reject(
						new MidtransNotificationError(
							'fail to parse `notification` string as JSON. Use JSON string or Object as `notification`. with message:' +
								err.message
						)
					)
				}
			}
			self
				.status(notification.transaction_id)
				.then((res) => resolve(res))
				.catch((err) => reject(err))
		})
	}
}

class MidtransNotificationError extends Error {}
