import { ApiConfig } from './apiConfig';
import { HttpClient } from './httpClient';
import { Transaction } from './transaction';
import { TransactionRequestType, SnapOptions } from '../types/snap';
/**
 * Snap object used to do request to Midtrans Snap API
 */
export declare class Snap {
    readonly apiConfig: InstanceType<typeof ApiConfig>;
    readonly httpClient: InstanceType<typeof HttpClient>;
    readonly transaction: InstanceType<typeof Transaction>;
    private apiUrl;
    private requestPayload;
    private matchSnap;
    constructor(options: Partial<SnapOptions> | Record<string, any>);
    /**
     * Do `/transactions` API request to Snap API
     * @param parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://snap-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    createTransaction<T extends Partial<TransactionRequestType>>(parameter: T | Record<any, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Wrapper function that call `createTransaction` then:
     * @return {Promise} - Promise of String token
     */
    createTransactionToken<T extends Partial<TransactionRequestType>>(parameter: T | Record<any, any>): ReturnType<() => Promise<string>>;
    /**
     * Wrapper function that call `createTransaction` then:
     * @return {Promise} - Promise of String redirect_url
     */
    createTransactionRedirectUrl<T extends Partial<TransactionRequestType>>(parameter: T | Record<any, any>): ReturnType<() => Promise<string>>;
}
