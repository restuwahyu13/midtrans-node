import { RefundRequest } from '../types/transaction';
/**
 * These are wrapper/implementation of API methods described on:
 * https://api-docs.midtrans.com/#midtrans-api
 * @return {Promise} - Promise that contains JSON API response decoded as Object
 */
export declare class Transaction {
    private readonly parent;
    private apiUrl;
    constructor(options: ThisType<any> | Record<string, any>);
    /**
     * Get information status of a transaction with certain order_id | transaction_id
     * @param transactionId
     * @return Promise
     */
    status(transactionId: string): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Get information status of multiple B2B transactions related to certain order_id | transaction_id
     * @param transactionId
     * @return Promise
     */
    statusb2b(transactionId: string): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Approve a transaction with certain order_id | transaction_id which gets challenge status from Fraud Detection System
     * @param transactionId
     * @return Promise
     */
    approve(transactionId: string): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Deny a transaction with certain order_id | transaction_id which gets challenge status from Fraud Detection System
     * @param transactionId
     * @return Promise
     */
    deny(transactionId: string): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Cancel a transaction with certain order_id | transaction_id Cancelation can only be done before settlement process
     * @param transactionId
     * @return Promise
     */
    cancel(transactionId: string): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * 	Update order_id | transaction_id with pending status to be expired
     * @param transactionId
     * @return Promise
     */
    expire(transactionId: string): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * 	Update order_id | transaction_id with settlement status to be refund
     * @param transactionId
     * @param parameter - optional
     * @return Promise
     */
    refund<T extends Partial<RefundRequest>>(transactionId: string, parameter?: T | Record<any, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Attempt to send refund to bank or payment provider and update the transaction status to refund if it succeeded
     * @param transactionId
     * @param parameter - optional
     * @return Promise
     */
    refundDirect<T extends Partial<RefundRequest>>(transactionId: string, parameter?: T | Record<any, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * An additional mechanism we provide to verify the content and the origin of the notification is to challenge. This can be achieved by calling the get status API. The response is the same as the notification status.
     * @param notification
     * @return Promise
     */
    notification(notification: Record<string, any>): ReturnType<() => Promise<any>>;
}
