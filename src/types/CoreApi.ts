export interface CoreApiOptions {
	readonly isProduction: boolean
	readonly serverKey: string
	readonly clientKey: string
}

/*
 *========================================
 * @description Global Charge Interface
 *=======================================
 */

type SubChargeCustomerDetailRequest = {
	readonly first_name: string
	readonly last_name: string
	readonly email: string
	readonly phone: string
	readonly address: string
	readonly city: string
	readonly postal_code: string
	readonly country_code: string
}

type SubItemDetails = {
	readonly id: string
	readonly price: number
	readonly quantity: number
	readonly name: string
	readonly brand?: string
	readonly category?: string
	readonly merchant_name?: string
}

type ChargeCustomerDetailRequest = {
	readonly first_name: string
	readonly last_name: string
	readonly email: string
	readonly phone: string
	readonly billing_address: SubChargeCustomerDetailRequest
}

/*
 * ====================================
 * @description Charge Custom Request
 * ====================================
 */

type ChargeBankRequest = {
	readonly bank: string
}

type ChargeTransactionDetailCustomRequest = {
	readonly order_id: string
	readonly gross_amount: number
}

export interface ChargeCustomRequest {
	readonly payment_type: string
	readonly bank_transfer: ChargeBankRequest
	readonly transaction_details: ChargeTransactionDetailCustomRequest
	readonly custom_field1?: Record<string, any>
	readonly custom_field2?: Record<string, any>
	readonly custom_field3?: Record<string, any>
}

/*
 * =============================================
 * @description Charge Full Credit Card Request
 * ============================================
 */

type ChargeTransactionDetailFullRequest = {
	readonly order_id: string
	readonly gross_amount: number
}

type SubDynamicDescriptor = {
	readonly merchant_name: string
	readonly city_name: string
	readonly country_code: string
}

type SubCreditCardRequest = {
	readonly number: string
	readonly expiry_month: string
	readonly expiry_year: string
	readonly cvv: string
}

export interface ChargeFullRequest {
	readonly payment_type: string
	readonly transaction_details: ChargeTransactionDetailFullRequest
	readonly credit_card?: {
		readonly card: SubCreditCardRequest
		readonly dynamic_descriptor?: SubDynamicDescriptor
	}
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * =======================================
 * @description Charge 3D Secure Request
 * =======================================
 */

type ChargeTransactionDetail3DRequest = {
	readonly order_id: string
	readonly gross_amount: number
}

type SubCreditCard3DRequest = {
	readonly token_id: string
	readonly bank: string
	readonly authentication: boolean
}

export interface Charge3dSecure {
	readonly ayment_type: string
	readonly transaction_details: ChargeTransactionDetail3DRequest
	readonly credit_card?: SubCreditCard3DRequest
}

/*
 * =======================================
 * @description Charge Bin Promo Request
 * =======================================
 */

type ChargeTransactionDetailBinPromoRequest = {
	readonly order_id: string
	readonly gross_amount: number
}

type SubCreditCardBinPromoRequest = {
	readonly token_id: string
	readonly bank: string
	readonly authentication: boolean
}

export interface ChargeBinPromo {
	readonly payment_type: string
	readonly transaction_details: ChargeTransactionDetailBinPromoRequest
	readonly credit_card: SubCreditCardBinPromoRequest
}

export interface CaptureRequest {
	readonly transaction_id: string
	readonly gross_amount: number
}

export interface CardTokenRequest {
	readonly card_number: string
	readonly card_exp_month: string
	readonly card_exp_year: string
	readonly client_key: string
}

export interface CardRegisterRequest {
	readonly card_number: string
	readonly card_exp_month: string
	readonly card_exp_year: string
	readonly client_key: string
	readonly callback?: (
		status_code?: number | number,
		status_message?: string,
		validation_messages?: Array<any>,
		token_id?: string
	) => void
}
