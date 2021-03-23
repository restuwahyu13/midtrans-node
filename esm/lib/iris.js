import { ApiConfig } from './apiConfig';
import { HttpClient } from './httpClient';
import { Transaction } from './transaction';
/**
 * Iris API is Midtrans’ cash management solution that allows you to disburse payments to any bank accounts in Indonesia securely and easily. Iris connects to the banks’ hosts to enable seamless transfer using integrated APIs.
 */
export class Iris {
    constructor(options) {
        this.apiConfig = new ApiConfig(options);
        this.httpClient = new HttpClient(this);
        this.transaction = new Transaction(this);
    }
    /**
     * Returns pong message for monitoring purpose
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    ping() {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/ping';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'get',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * Use this API to create a new beneficiary information for quick access on the payout page in Iris Portal.
     * @param parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    createBeneficiaries(parameter) {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/beneficiaries';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'post',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: parameter === null || parameter === undefined ? parameter : parameter
        });
    }
    /**
     * Use this API to update an existing beneficiary identified by its alias_name. Do update `/beneficiaries/<alias_name>` API request to Iris API
     * @param parameter - alias_name of the beneficiaries that need to be updated
     * @param parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    updateBeneficiaries(aliasName, parameter) {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/beneficiaries/' + aliasName;
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'patch',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: parameter === null || parameter === undefined ? parameter : parameter
        });
    }
    /**
     * Use this API to fetch list of all beneficiaries saved in Iris Portal.
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getBeneficiaries() {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/beneficiaries';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'get',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * This API is for Creator to create a payout. It can be used for single payout and also multiple payouts.
     * @param parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    createPayouts(parameter) {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/payouts';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'post',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: parameter === null || parameter === undefined ? parameter : parameter
        });
    }
    /**
     * Use this API for Apporver to approve multiple payout request.
     * @param parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    approvePayouts(parameter) {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/payouts/approve';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'post',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: parameter === null || parameter === undefined ? parameter : parameter
        });
    }
    /**
     * Use this API for Apporver to reject multiple payout request.
     * @param parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    rejectPayouts(parameter) {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/payouts/reject';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'post',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: parameter === null || parameter === undefined ? parameter : parameter
        });
    }
    /**
     * Get details of a single payout
     * @param parameter - reference_no of the payout
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getPayoutDetails(referenceNo) {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/payouts/' + referenceNo;
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'get',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * List all transactions history for a month. You can specified start date and also end date for range transaction history.
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getTransactionHistory(parameter) {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/statements';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'get',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: parameter === null || parameter === undefined ? parameter : parameter
        });
    }
    /**
     * Provide top up information channel for Aggregator Partner
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getTopupChannels() {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/channels';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'get',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * Use this API is to get current balance
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getBalance() {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/balance';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'get',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * Show list of registered bank accounts for facilitator partner
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getFacilitatorBankAccounts() {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/bank_accounts';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'get',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     *  use this API is to get current balance information of your registered bank account.
     * @param parameter - bank_account_id of the bank account
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getFacilitatorBalance(bankAccountId) {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/bank_accounts/' + bankAccountId + '/balance';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'get',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * Show list of supported banks in IRIS.
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getBeneficiaryBanks() {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/beneficiary_banks';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'get',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * Check if an account is valid, if valid return account information.
     * @param parameter - object of Iris API JSON body as parameter, will be converted to GET Query param (more params detail refer to: https://iris-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    validateBankAccount(parameter) {
        this.apiUrl = this.apiConfig.getIrisApiBaseUrl() + '/account_validation';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'get',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: parameter === null || parameter === undefined ? parameter : parameter
        });
    }
}
