import { ApiConfig } from './apiConfig';
import { HttpClient } from './httpClient';
import { IrisOptions, BeneficiariesOptions, PayoutOptions, ApprovePayoutOptions, RejectPayoutsOptions, TransactionHistoryOptions, ValidateBankAccountOptions } from '../types/iris';
/**
 * Iris API is Midtrans’ cash management solution that allows you to disburse payments to any bank accounts in Indonesia securely and easily. Iris connects to the banks’ hosts to enable seamless transfer using integrated APIs.
 */
export declare class Iris {
    /**
     * Initiate with options
     * @param  {Object} options - should have these props:
     * isProduction, apiKey
     */
    readonly apiConfig: InstanceType<typeof ApiConfig>;
    readonly httpClient: InstanceType<typeof HttpClient>;
    private readonly transaction;
    private apiUrl;
    constructor(options: Partial<IrisOptions> | Record<string, any>);
    /**
     * Returns pong message for monitoring purpose
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    ping(): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Use this API to create a new beneficiary information for quick access on the payout page in Iris Portal.
     * @param parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    createBeneficiaries<T extends Partial<BeneficiariesOptions>>(parameter: T | Record<string, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Use this API to update an existing beneficiary identified by its alias_name. Do update `/beneficiaries/<alias_name>` API request to Iris API
     * @param parameter - alias_name of the beneficiaries that need to be updated
     * @param parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    updateBeneficiaries<T extends Partial<BeneficiariesOptions>>(aliasName: string, parameter: T | Record<string, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Use this API to fetch list of all beneficiaries saved in Iris Portal.
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getBeneficiaries(): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * This API is for Creator to create a payout. It can be used for single payout and also multiple payouts.
     * @param parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    createPayouts<T extends Partial<PayoutOptions>>(parameter: T | Record<string, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Use this API for Apporver to approve multiple payout request.
     * @param parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    approvePayouts<T extends Partial<ApprovePayoutOptions>>(parameter: T | Record<string, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Use this API for Apporver to reject multiple payout request.
     * @param parameter - object of Iris API JSON body as parameter, will be converted to JSON (more params detail refer to: https://iris-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    rejectPayouts<T extends Partial<RejectPayoutsOptions>>(parameter: T | Record<string, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Get details of a single payout
     * @param parameter - reference_no of the payout
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getPayoutDetails(referenceNo: string): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * List all transactions history for a month. You can specified start date and also end date for range transaction history.
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getTransactionHistory<T extends Partial<TransactionHistoryOptions>>(parameter: T | Record<string, any>): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Provide top up information channel for Aggregator Partner
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getTopupChannels(): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Use this API is to get current balance
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getBalance(): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Show list of registered bank accounts for facilitator partner
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getFacilitatorBankAccounts(): ReturnType<() => Promise<Record<string, any>>>;
    /**
     *  use this API is to get current balance information of your registered bank account.
     * @param parameter - bank_account_id of the bank account
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getFacilitatorBalance(bankAccountId: string): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Show list of supported banks in IRIS.
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    getBeneficiaryBanks(): ReturnType<() => Promise<Record<string, any>>>;
    /**
     * Check if an account is valid, if valid return account information.
     * @param parameter - object of Iris API JSON body as parameter, will be converted to GET Query param (more params detail refer to: https://iris-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    validateBankAccount<T extends Partial<ValidateBankAccountOptions>>(parameter: T | Record<any, any>): ReturnType<() => Promise<Record<string, any>>>;
}
