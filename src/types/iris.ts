export interface IrisOptions {
	readonly isProduction: boolean
	readonly serverKey: string
	readonly clientKey: string
}

export interface BeneficiariesOptions {
	readonly name: string
	readonly account: string
	readonly bank: string
	readonly alias_name?: string
	readonly email: string
}

type SubPayoutOptions = {
	readonly beneficiary_name: string
	readonly beneficiary_account: string
	readonly beneficiary_bank: string
	readonly beneficiary_email: string
	readonly amount: string
	readonly notes: string
}

export interface PayoutOptions {
	readonly payouts: SubPayoutOptions | SubPayoutOptions[]
}

export interface ApprovePayoutsOptions {
	readonly reference_nos: string[]
	readonly otp: string
}

export interface RejectPayoutsOptions {
	readonly reference_nos: string[]
	readonly reject_reason: string
}

export interface PayoutDetailsOptions {
	readonly amount: string
	readonly beneficiary_name: string
	readonly beneficiary_account: string
	readonly bank: string
	readonly reference_no: string
	readonly notes: string
	readonly beneficiary_email: string
	readonly status: string
	readonly created_by: string
	readonly created_at?: string
	readonly updated_at?: string
}

export interface TransactionHistory {
	readonly from_date: string
	readonly to_date: string
}

export interface ValidateBankAccountOptions {
	readonly bank: string
	readonly account: number
}
