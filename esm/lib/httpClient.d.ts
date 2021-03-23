import { RequestOptions } from '../types/HttpClient';
/**
 * Wrapper of Axios to do API request to Midtrans API
 * @return {Promise} of API response, or exception during request
 * capable to do HTTP `request`
 */
export declare class HttpClient {
    private readonly parent;
    private readonly httpClient;
    private readonly headers;
    private readonly requestBody?;
    private readonly requestParam?;
    constructor(options?: ThisType<any> | Record<string, any>);
    request<T extends Partial<RequestOptions>>(options: T | Record<any, any>): ReturnType<() => Promise<Record<string, any>>>;
}
