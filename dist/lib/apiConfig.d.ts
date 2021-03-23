import { ApiConfigOptions, ApiConfigGetter } from '../types/ApiConfig';
export declare class ApiConfig {
    private static readonly CORE_SANDBOX_BASE_URL;
    private static readonly CORE_PRODUCTION_BASE_URL;
    private static readonly SNAP_SANDBOX_BASE_URL;
    private static readonly SNAP_PRODUCTION_BASE_URL;
    private static readonly IRIS_SANDBOX_BASE_URL;
    private static readonly IRIS_PRODUCTION_BASE_URL;
    private isProduction;
    private serverKey;
    private clientKey;
    private parsedOptions;
    private mergedConfig;
    /**
     * Initiate with options
     * @param  {Object} options - should have these props:
     * isProduction, serverKey, clientKey
     */
    constructor(options: Partial<ApiConfigOptions> | Record<string, any>);
    /**
     * Return config stored
     * @return {Object} object contains isProduction, serverKey, clientKey
     */
    get(): ReturnType<() => ApiConfigGetter>;
    /**
     * Set config stored
     * @param {Object} options - object contains isProduction, serverKey, clientKey]
     */
    set<T extends Partial<ApiConfigOptions>>(options: T | Record<any, any>): ReturnType<() => void>;
    /**
     * @return {String} core api base url
     */
    getCoreApiBaseUrl(): ReturnType<() => string>;
    /**
     * @return {String} snap api base url
     */
    getSnapApiBaseUrl(): ReturnType<() => string>;
    /**
     * @return {String} Iris api base url
     */
    getIrisApiBaseUrl(): ReturnType<() => string>;
}
