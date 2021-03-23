"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snap = void 0;
const apiConfig_1 = require("./apiConfig");
const httpClient_1 = require("./httpClient");
const transaction_1 = require("./transaction");
const matchSnap_1 = require("../utils/matchSnap");
/**
 * Snap object used to do request to Midtrans Snap API
 */
class Snap {
    constructor(options) {
        this.apiConfig = new apiConfig_1.ApiConfig(options);
        this.httpClient = new httpClient_1.HttpClient(this);
        this.transaction = new transaction_1.Transaction(this);
        this.matchSnap = matchSnap_1.matchSnap;
    }
    /**
     * Do `/transactions` API request to Snap API
     * @param parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://snap-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    createTransaction(parameter) {
        this.apiUrl = this.apiConfig.getSnapApiBaseUrl() + '/transactions';
        return this.httpClient.request({
            requestUrl: this.apiUrl,
            httpMethod: 'post',
            serverKey: this.apiConfig.get().serverKey,
            requestPayload: parameter === null || parameter === undefined
                ? parameter
                : !this.matchSnap(Object.keys(parameter)[0])
                    ? parameter
                    : Object.values(parameter)[0]
        });
    }
    /**
     * Wrapper function that call `createTransaction` then:
     * @return {Promise} - Promise of String token
     */
    createTransactionToken(parameter) {
        this.requestPayload =
            parameter === null || parameter === undefined
                ? parameter
                : !this.matchSnap(Object.keys(parameter)[0])
                    ? parameter
                    : Object.values(parameter)[0];
        return this.createTransaction(this.requestPayload).then((res) => res.token);
    }
    /**
     * Wrapper function that call `createTransaction` then:
     * @return {Promise} - Promise of String redirect_url
     */
    createTransactionRedirectUrl(parameter) {
        this.requestPayload =
            parameter === null || parameter === undefined
                ? parameter
                : !this.matchSnap(Object.keys(parameter)[0])
                    ? parameter
                    : Object.values(parameter)[0];
        return this.createTransaction(this.requestPayload).then((res) => res.redirect_url);
    }
}
exports.Snap = Snap;
