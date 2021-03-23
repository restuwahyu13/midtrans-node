import { ApiConfig } from './apiConfig';
import { HttpClient } from './httpClient';
import { Transaction } from './transaction';
import { CoreApiOptions, ChargeTypeRequest, CaptureRequest, CardRegisterRequest, CardTokenRequest } from '../types/CoreApi';
/**
 * CoreApi Midtrans is a RESTful Web Service served as a communication bridge between merchants and our payment channels.
 */
export declare class CoreApi {
    /**
     * Initiate with options
     * @param  {Object} options - should have these props:
     * isProduction, serverKey, clientKey
     */
    apiConfig: InstanceType<typeof ApiConfig>;
    httpClient: InstanceType<typeof HttpClient>;
    transaction: InstanceType<typeof Transaction>;
    private apiUrl;
    private requestPayload;
    constructor(options: Partial<CoreApiOptions> | Record<string, any>);
    /**
     * Perform a transaction with various available payment methods and features. Example given: Credit Card Charge.
     * @param  parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    charge<T extends Partial<ChargeTypeRequest>>(parameter: T | Record<string, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     *  Capture an authorized transaction for card payment
     * @param parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    capture<T extends Partial<CaptureRequest>>(parameter: T | Record<string, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Register card information (card number and expiry) to be used for two clicks and one click
     * @param parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    cardRegister<T extends Partial<CardRegisterRequest>>(parameter: T | Record<any, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Tokenize Credit Card information before being charged
     * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    cardToken<T extends Partial<CardTokenRequest>>(parameter: T | Record<string, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Get the point balance of the card in denomination amount
     * @param  {String} tokenId - tokenId of credit card (more params detail refer to: https://api-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    cardPointInquiry(tokenId: string): ReturnType<() => Promise<Record<string, any>>>;
}
