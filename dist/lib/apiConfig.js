"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiConfig = void 0;
const lodash_1 = __importDefault(require("lodash"));
class ApiConfig {
    /**
     * Initiate with options
     * @param  {Object} options - should have these props:
     * isProduction, serverKey, clientKey
     */
    constructor(options) {
        this.isProduction = false;
        this.serverKey = '';
        this.clientKey = '';
        this.set(options);
    }
    /**
     * Return config stored
     * @return {Object} object contains isProduction, serverKey, clientKey
     */
    get() {
        const currentConfig = {
            isProduction: this.isProduction,
            serverKey: this.serverKey,
            clientKey: this.clientKey
        };
        return currentConfig;
    }
    /**
     * Set config stored
     * @param {Object} options - object contains isProduction, serverKey, clientKey]
     */
    set(options) {
        const currentConfig = {
            isProduction: this.isProduction,
            serverKey: this.serverKey,
            clientKey: this.clientKey
        };
        this.parsedOptions = lodash_1.default.pick(options, ['isProduction', 'serverKey', 'clientKey']);
        this.mergedConfig = Object.assign(currentConfig, this.parsedOptions);
        this.isProduction = options ? this.mergedConfig.isProduction : this.isProduction;
        this.serverKey = options ? this.mergedConfig.serverKey : this.serverKey;
        this.clientKey = options ? this.mergedConfig.clientKey : this.clientKey;
    }
    /**
     * @return {String} core api base url
     */
    getCoreApiBaseUrl() {
        return this.isProduction ? ApiConfig.CORE_PRODUCTION_BASE_URL : ApiConfig.CORE_SANDBOX_BASE_URL;
    }
    /**
     * @return {String} snap api base url
     */
    getSnapApiBaseUrl() {
        return this.isProduction ? ApiConfig.SNAP_PRODUCTION_BASE_URL : ApiConfig.SNAP_SANDBOX_BASE_URL;
    }
    /**
     * @return {String} Iris api base url
     */
    getIrisApiBaseUrl() {
        return this.isProduction ? ApiConfig.IRIS_PRODUCTION_BASE_URL : ApiConfig.IRIS_SANDBOX_BASE_URL;
    }
}
exports.ApiConfig = ApiConfig;
ApiConfig.CORE_SANDBOX_BASE_URL = 'https://api.sandbox.midtrans.com/v2';
ApiConfig.CORE_PRODUCTION_BASE_URL = 'https://api.midtrans.com/v2';
ApiConfig.SNAP_SANDBOX_BASE_URL = 'https://app.sandbox.midtrans.com/snap/v1';
ApiConfig.SNAP_PRODUCTION_BASE_URL = 'https://app.midtrans.com/snap/v1';
ApiConfig.IRIS_SANDBOX_BASE_URL = 'https://app.sandbox.midtrans.com/iris/api/v1';
ApiConfig.IRIS_PRODUCTION_BASE_URL = 'https://app.midtrans.com/iris/api/v1';
