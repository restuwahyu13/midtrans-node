export interface MidtransErrorOptions {
    readonly message: string;
    readonly httpStatusCode?: number;
    readonly ApiResponse?: any;
    readonly rawHttpClientData?: any;
}
