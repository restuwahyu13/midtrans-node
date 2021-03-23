declare type HttpClientOptionsConfigs = {
    readonly isProduction?: boolean;
    readonly serverKey?: string;
    readonly clientKey?: string;
};
export interface HttpClientOptions {
    readonly url: string;
    readonly method: string;
    readonly configs?: HttpClientOptionsConfigs;
    readonly parameter?: any;
}
export interface RequestOptions {
    readonly requestUrl: string;
    readonly httpMethod: string;
    readonly serverKey: string;
    readonly requestPayload?: any;
}
export {};
