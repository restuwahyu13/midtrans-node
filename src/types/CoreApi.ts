export interface CoreApiOptions {
	readonly isProduction: boolean
	readonly serverKey: string
	readonly clientKey: string
}

type ChargeRequestBank = {
	readonly bank: string
}

type ChargeRequestTransactionDetail = {
	readonly order_id: string
	readonly gross_amount: number
}

export interface ChargeRequest {
	readonly payment_type: string
	readonly bank_transfer: ChargeRequestBank
	readonly transaction_details: ChargeRequestTransactionDetail
	readonly custom_field1?: Record<string, any>
	readonly custom_field2?: Record<string, any>
	readonly custom_field3?: Record<string, any>
}

export interface CaptureRequest {
	readonly transaction_id: string
	readonly gross_amount: number
}

export interface CardTokenRequest {
	card_number: string
	card_exp_month: string
	card_exp_year: string
	client_key: string
}

export interface CardRegisterRequest {
	card_number: string
	card_exp_month: string
	card_exp_year: string
	client_key: string
	callback?: (
		status_code?: number | number,
		status_message?: string,
		validation_messages?: Array<any>,
		token_id?: string
	) => void
}
