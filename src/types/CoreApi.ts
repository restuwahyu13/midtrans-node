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
	readonly payment_type: 'bank_transfer'
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
