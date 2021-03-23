"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
/**
 * These are wrapper/implementation of API methods described on:
 * https://api-docs.midtrans.com/#midtrans-api
 * @return {Promise} - Promise that contains JSON API response decoded as Object
 */
class Transaction {
    constructor(options) {
        this.parent = options;
    }
    /**
     * Get information status of a transaction with certain order_id | transaction_id
     * @param transactionId
     * @return Promise
     */
    status(transactionId) {
        this.apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/status';
        return this.parent.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'get',
            serverKey: this.parent.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * Get information status of multiple B2B transactions related to certain order_id | transaction_id
     * @param transactionId
     * @return Promise
     */
    statusb2b(transactionId) {
        this.apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/statusb2b';
        return this.parent.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'get',
            serverKey: this.parent.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * Approve a transaction with certain order_id | transaction_id which gets challenge status from Fraud Detection System
     * @param transactionId
     * @return Promise
     */
    approve(transactionId) {
        this.apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/approve';
        return this.parent.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'post',
            serverKey: this.parent.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * Deny a transaction with certain order_id | transaction_id which gets challenge status from Fraud Detection System
     * @param transactionId
     * @return Promise
     */
    deny(transactionId) {
        this.apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/deny';
        return this.parent.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'post',
            serverKey: this.parent.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * Cancel a transaction with certain order_id | transaction_id Cancelation can only be done before settlement process
     * @param transactionId
     * @return Promise
     */
    cancel(transactionId) {
        this.apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/cancel';
        return this.parent.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'post',
            serverKey: this.parent.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * 	Update order_id | transaction_id with pending status to be expired
     * @param transactionId
     * @return Promise
     */
    expire(transactionId) {
        this.apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/expire';
        return this.parent.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'post',
            serverKey: this.parent.apiConfig.get().serverKey,
            requestPayload: null
        });
    }
    /**
     * 	Update order_id | transaction_id with settlement status to be refund
     * @param transactionId
     * @param parameter - optional
     * @return Promise
     */
    refund(transactionId, parameter) {
        this.apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/refund';
        return this.parent.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'post',
            serverKey: this.parent.apiConfig.get().serverKey,
            requestPayload: parameter
        });
    }
    /**
     * Attempt to send refund to bank or payment provider and update the transaction status to refund if it succeeded
     * @param transactionId
     * @param parameter - optional
     * @return Promise
     */
    refundDirect(transactionId, parameter) {
        this.apiUrl = this.parent.apiConfig.getCoreApiBaseUrl() + '/' + transactionId + '/refund/online/direct';
        return this.parent.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'post',
            serverKey: this.parent.apiConfig.get().serverKey,
            requestPayload: parameter
        });
    }
    /**
     * An additional mechanism we provide to verify the content and the origin of the notification is to challenge. This can be achieved by calling the get status API. The response is the same as the notification status.
     * @param notification
     * @return Promise
     */
    notification(notification) {
        let self = this;
        return new Promise(function (resolve, reject) {
            if (typeof notification === 'string') {
                try {
                    notification = JSON.parse(notification);
                }
                catch (err) {
                    reject(new MidtransNotificationError('fail to parse `notification` string as JSON. Use JSON string or Object as `notification`. with message:' +
                        err.message));
                }
            }
            self
                .status(notification.transaction_id)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
}
exports.Transaction = Transaction;
class MidtransNotificationError extends Error {
}
