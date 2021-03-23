export interface RefundRequest {
    readonly refund_key?: string;
    readonly amount?: number;
    readonly reason?: string;
}
export interface TransactionOptions {
    readonly isProduction: boolean;
    readonly serverKey: string;
    readonly clientKey: string;
}
