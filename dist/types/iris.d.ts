export interface IrisOptions {
    readonly isProduction: boolean;
    readonly serverKey: string;
    readonly clientKey?: string;
}
export interface BeneficiariesOptions {
    readonly name: string;
    readonly account: string;
    readonly bank: string;
    readonly alias_name?: string;
    readonly email: string;
}
declare type SubPayoutOptions = {
    readonly beneficiary_name: string;
    readonly beneficiary_account: string;
    readonly beneficiary_bank: string;
    readonly beneficiary_email: string;
    readonly amount: string;
    readonly notes: string;
};
export interface PayoutOptions {
    readonly payouts: SubPayoutOptions | SubPayoutOptions[];
}
export interface ApprovePayoutOptions {
    readonly reference_nos: string[];
    readonly otp?: string;
}
export interface RejectPayoutsOptions {
    readonly reference_nos: string[];
    readonly reject_reason: string;
}
export interface TransactionHistoryOptions {
    readonly from_date: string;
    readonly to_date: string;
}
export interface ValidateBankAccountOptions {
    readonly bank: string;
    readonly account: number;
}
export {};
