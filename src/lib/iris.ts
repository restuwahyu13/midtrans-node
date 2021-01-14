// import { ApiConfig } from './apiConfig'
// import { HttpClient } from './httpClient'
// import { Transaction } from './transaction'
// /**
//  * Iris object able to do API request to Midtrans Iris API
//  */

// export class Iris {
// 	/**
// 	 * Initiate with options
// 	 * @param  {Object} options - should have these props:
// 	 * isProduction, apiKey
// 	 */

// 	private isProduction: boolean
// 	private serverKey: string
// 	private clientKey: string

// 	constructor(options = { isProduction: false, serverKey: '' }) {
// 		this.isProduction = false
// 		this.serverKey = ''
// 		this.clientKey = ''
// 		this.o = {}

// 		const { isProduction, serverKey, clientKey } = this
// 		options ? new ApiConfig(options) : 3.0

// 		iConfig(options)({ isProduction, serverKey, clientKey })

// 		this.apiConfig = this.httpClient = new HttpClient(this)
// 		this.transaction = new Transaction(this)
// 	}

// 	/**
// 	 * Do `/ping` API request to Iris API
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public ping(): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/ping'
// 		let responsePromise = this.httpClient.request('get', this.apiConfig.get().serverKey, apiUrl)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do create `/beneficiaries` API request to Iris API
// 	 * @param  {Object} parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public createBeneficiaries(parameter: Record<string, any> = {}): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/beneficiaries'
// 		let responsePromise = this.httpClient.request('post', this.apiConfig.get().serverKey, apiUrl, parameter)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do update `/beneficiaries/<alias_name>` API request to Iris API
// 	 * @param  {String} parameter - alias_name of the beneficiaries that need to be updated
// 	 * @param  {Object} parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public updateBeneficiaries(aliasName: string, parameter: Record<string, any> = {}): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/beneficiaries/' + aliasName
// 		let responsePromise = this.httpClient.request('patch', this.apiConfig.get().serverKey, apiUrl, parameter)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do `/beneficiaries` API request to Iris API
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public getBeneficiaries(): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/beneficiaries'
// 		let responsePromise = this.httpClient.request('get', this.apiConfig.get().serverKey, apiUrl)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do create `/payouts` API request to Iris API
// 	 * @param  {Object} parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public createPayouts(parameter: Record<string, any> = {}): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/payouts'
// 		let responsePromise = this.httpClient.request('post', this.apiConfig.get().serverKey, apiUrl, parameter)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do approve `/payouts/approve` API request to Iris API
// 	 * @param  {Object} parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public approvePayouts(parameter: Record<string, any> = {}): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/payouts/approve'
// 		let responsePromise = this.httpClient.request('post', this.apiConfig.get().serverKey, apiUrl, parameter)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do reject `/payouts/reject` API request to Iris API
// 	 * @param  {Object} parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public rejectPayouts(parameter: Record<string, any> = {}): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/payouts/reject'
// 		let responsePromise = this.httpClient.request('post', this.apiConfig.get().serverKey, apiUrl, parameter)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do `/payouts/<reference_no>` API request to Iris API
// 	 * @param  {String} parameter - reference_no of the payout
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public getPayoutDetails(referenceNo: string): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/payouts/' + referenceNo
// 		let responsePromise = this.httpClient.request('get', this.apiConfig.get().serverKey, apiUrl)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do `/statements` API request to Iris API
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */
// 	// https://iris-docs.midtrans.com/#transaction-history

// 	public getTransactionHistory(parameter: Record<string, any> = {}): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/statements'
// 		let responsePromise = this.httpClient.request(
// 			'get',
// 			this.apiConfig.get().serverKey,
// 			apiUrl,
// 			null, // it doesn't use URL query param
// 			parameter
// 		) // but it use JSON param instead, non standard
// 		return responsePromise
// 	}

// 	/**
// 	 * Do `/channels` API request to Iris API
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public getTopupChannels(): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/channels'
// 		let responsePromise = this.httpClient.request('get', this.apiConfig.get().serverKey, apiUrl)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do `/balance` API request to Iris API
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public getBalance(): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/balance'
// 		let responsePromise = this.httpClient.request('get', this.apiConfig.get().serverKey, apiUrl)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do `/bank_accounts` API request to Iris API
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public getFacilitatorBankAccounts(): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/bank_accounts'
// 		let responsePromise = this.httpClient.request('get', this.apiConfig.get().serverKey, apiUrl)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do `/bank_accounts/<bank_account_id>/balance` API request to Iris API
// 	 * @param  {String} parameter - bank_account_id of the bank account
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public getFacilitatorBalance(bankAccountId): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/bank_accounts/' + bankAccountId + '/balance'
// 		let responsePromise = this.httpClient.request('get', this.apiConfig.get().serverKey, apiUrl)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do `/beneficiary_banks` API request to Iris API
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public getBeneficiaryBanks(): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/beneficiary_banks'
// 		let responsePromise = this.httpClient.request('get', this.apiConfig.get().serverKey, apiUrl)
// 		return responsePromise
// 	}

// 	/**
// 	 * Do `/account_validation` API request to Iris API
// 	 * @param  {Object} parameter - object of Iris API JSON body as parameter, will be converted to GET Query param (more params detail refer to: https://iris-docs.midtrans.com)
// 	 * @return {Promise} - Promise contains Object from JSON decoded response
// 	 */

// 	public validateBankAccount(parameter: Record<string, any> = {}): Promise<Record<string, any>> {
// 		let apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/account_validation'
// 		let responsePromise = this.httpClient.request('get', this.apiConfig.get().serverKey, apiUrl, parameter)
// 		return responsePromise
// 	}
// }
