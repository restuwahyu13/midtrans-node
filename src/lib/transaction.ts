import { ApiConfig } from './apiConfig'
import { HttpClient } from './httpClient'

/**
 * These are wrapper/implementation of API methods described on:
 * https://api-docs.midtrans.com/#midtrans-api
 * @return {Promise} - Promise that contains JSON API response decoded as Object
 */

export class Transaction {
	constructor(parentObj = {}) {
		this.parent = parentObj
	}

	public status(transactionId = '') {
		let apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/status'
		let responsePromise = this.parent.httpClient.request('get', this.parent.apiConfig.get().serverKey, apiUrl, null)
		return responsePromise
	}

	public statusb2b(transactionId = '') {
		let apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/statusb2b'
		let responsePromise = this.parent.httpClient.request('get', this.parent.apiConfig.get().serverKey, apiUrl, null)
		return responsePromise
	}

	public approve(transactionId = '') {
		let apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/approve'
		let responsePromise = this.parent.httpClient.request('post', this.parent.apiConfig.get().serverKey, apiUrl, null)
		return responsePromise
	}

	public deny(transactionId = '') {
		let apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/deny'
		let responsePromise = this.parent.httpClient.request('post', this.parent.apiConfig.get().serverKey, apiUrl, null)
		return responsePromise
	}

	public cancel(transactionId = '') {
		let apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/cancel'
		let responsePromise = this.parent.httpClient.request('post', this.parent.apiConfig.get().serverKey, apiUrl, null)
		return responsePromise
	}

	public expire(transactionId = '') {
		let apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/expire'
		let responsePromise = this.parent.httpClient.request('post', this.parent.apiConfig.get().serverKey, apiUrl, null)
		return responsePromise
	}

	public refund(transactionId = '', parameter = {}) {
		let apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/refund'
		let responsePromise = this.parent.httpClient.request(
			'post',
			this.parent.apiConfig.get().serverKey,
			apiUrl,
			parameter
		)
		return responsePromise
	}

	public refundDirect(transactionId = '', parameter = {}) {
		let apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/refund/online/direct'
		let responsePromise = this.parent.httpClient.request(
			'post',
			this.parent.apiConfig.get().serverKey,
			apiUrl,
			parameter
		)
		return responsePromise
	}

	public notification(notificationObj = {}) {
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
