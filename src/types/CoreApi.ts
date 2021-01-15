/*
 *========================================
 * @description Core API Options
 *=======================================
 */

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

type TransactionDetailOptions = {
	readonly order_id: string
	readonly gross_amount: number
}

type BillingAddressOptions = {
	readonly first_name?: string
	readonly last_name?: string
	readonly emai?: string
	readonly phone?: string
	readonly address: string
	readonly city: string
	readonly postal_code: string
	readonly country_code?: string
}
type ItemDetailsOptions = {
	readonly id?: string
	readonly price: number
	readonly quantity: number
	readonly name: string
	readonly brand?: string
	readonly category?: string
	readonly merchant_name?: string
	/*
	 * @description For BCA Klikpay
	 */
	readonly tenor?: number
	readonly code_plan?: number
	readonly mid?: number
}

type ChargeCustomerDetailOptions = {
	readonly first_name: string
	readonly last_name: string
	readonly email: string
	readonly phone: string
	readonly billing_address?: BillingAddressOptions
}

type ShipingDetailOptions = {
	readonly first_name: string
	readonly last_name: string
	readonly email: string
	readonly phone: string
	readonly billing_address?: BillingAddressOptions
}

type DynamicDescriptorOptions = {
	readonly merchant_name: string
	readonly city_name: string
	readonly country_code: string
}

type CreditCardOptions = {
	readonly token_id: string
	readonly bank?: string
	readonly installment_term?: number
	readonly bins?: string[]
	readonly type?: string
	readonly save_token_id?: boolean
	readonly authentication?: boolean
}

/*
 * ====================================
 * @description Charge Custom Request
 * ====================================
 */

type ChargeBankOptions = {
	readonly bank: string
}

type ChargeBankTransfer = {
	readonly payment_type: string
	readonly bank_transfer: ChargeBankOptions
	readonly transaction_details: TransactionDetailOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly custom_field1?: Record<string, any>
	readonly custom_field2?: Record<string, any>
	readonly custom_field3?: Record<string, any>
}

/*
 * =============================================
 * @description Charge All Credit Card Request
 * ============================================
 */

type ChargeCreditCard = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly credit_card: CreditCardOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
}

/*
 * ==============================================
 * @description Charge Non 3DS Integration Request
 * ==============================================
 */

type CreditCardOptionsNon3DS = {
	readonly number: string
	readonly expiry_month: string
	readonly expiry_year: string
	readonly cvv?: string
	readonly merchant_name?: string
	readonly city_name?: string
	readonly country_code?: string
}

type ChargeNon3DS = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly credit_card: {
		readonly card: CreditCardOptionsNon3DS
		readonly dynamic_descriptor?: DynamicDescriptorOptions
	}
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
}

/*
 * ==============================================
 * @description Charge 3DS Integration Request
 * ==============================================
 */

type CreditCardOptions3DSOptions = {
	readonly number: string
	readonly expiry_month: string
	readonly expiry_year: string
	readonly cvv?: string
	readonly merchant_name?: string
	readonly city_name?: string
	readonly country_code?: string
}

type Charge3DS = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly credit_card: {
		readonly card: CreditCardOptions3DSOptions
		readonly dynamic_descriptor?: DynamicDescriptorOptions
		readonly authentication?: boolean
		readonly callback_type?: string
	}
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
}

/*
 * ==============================================
 * @description Permata Virtual Account Request
 * ==============================================
 */

type SubPermataOptions = {
	readonly recipient_name?: string
}

type BankTransferPermataOptions = {
	readonly bank: string
	readonly permata?: SubPermataOptions
}

type ChargePermataVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly bank_transfer: BankTransferPermataOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description BCA Virtual Account Request
 * ==============================================
 */

type InquiryPaymentOptions = {
	readonly id: string
	readonly en: string
}

type FreeTextOptions = {
	readonly inquiry?: InquiryPaymentOptions[]
	readonly payment?: InquiryPaymentOptions[]
}

type BcaOptions = {
	readonly sub_company_code?: string
}

type BankTransferBcaOptions = {
	readonly bank: string
	readonly va_number?: number
	readonly free_text?: FreeTextOptions
	readonly bca?: BcaOptions
}

type ChargeBcaVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly bank_transfer: BankTransferBcaOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Mandiri Virtual Account Request
 * ==============================================
 */

type EchannelOptions = {
	readonly bill_info1: string
	readonly bill_info2: string
	readonly bill_info3?: string
	readonly bill_info4?: string
	readonly bill_info5?: string
	readonly bill_info6?: string
	readonly bill_info7?: string
	readonly bill_info8?: string
}

type ChargeMandiriVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly echannel: EchannelOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description BNI Virtual Account Request
 * ==============================================
 */

type BankTransferBniOptions = {
	readonly bank: string
	readonly va_number?: string
}

type ChargeBniVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly bank_transfer: BankTransferBniOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description BRI Virtual Account Request
 * ==============================================
 */

type BankTransferBriOptions = {
	readonly bank: string
	readonly va_number?: string
}

type ChargeBriVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly bank_transfer: BankTransferBriOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description BCA Klikpay Request
 * ==============================================
 */

type KlikPayOptions = {
	readonly description: string
	readonly misc_fee?: string
}

type ChargeBcaKlikpay = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly bca_klikpay: KlikPayOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description BCA Klik BCA Request
 * ==============================================
 */

type KlikBcaOptions = {
	readonly description: string
	readonly user_id: string
}

type ChargeKlikBca = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly bca_klikbca: KlikBcaOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description BRI Epay Request
 * ==============================================
 */

type ChargeBriEpay = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Cimb Click Request
 * ==============================================
 */

type CimbClickOptions = {
	readonly description: string
}

type ChargeCimbClick = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly cimb_clicks: CimbClickOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
}

/*
 * ==============================================
 * @description Danamon Online Request
 * ==============================================
 */

type ChargeDanamonOnline = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Qris Request
 * ==============================================
 */

type QrisOptions = {
	readonly acquirer: string
}

type ChargeQris = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly qris?: QrisOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Gopay Request
 * ==============================================
 */

type GopayOptions = {
	readonly enable_callback?: boolean
	readonly callback_url?: string
	readonly account_id: string
	readonly payment_option_token: string
	readonly pre_auth?: boolean
}

type ChargeGopay = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly gopay: GopayOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Shoope Pay Request
 * ==============================================
 */

type ShoopeOptions = {
	readonly callback_url: string
}

type ChargeShoopePay = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly shopeepay?: ShoopeOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Indomaret Pay Request
 * ==============================================
 */

type IndomartCsStoreOptions = {
	readonly store: string
	readonly message?: string
}

type ChargeIndomaret = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly cstore: IndomartCsStoreOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}
/*
 * ==============================================
 * @description Alfamart Pay Request
 * ==============================================
 */

type AlfamartCsStoreOptions = {
	readonly store: string
	readonly alfamart_free_text_1?: string
	readonly alfamart_free_text_2?: string
	readonly alfamart_free_text_3?: string
}

type ChargeAlfamart = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly cstore: AlfamartCsStoreOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Akulaku Request
 * ==============================================
 */

type ChargeAkuLaku = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly item_details?: ItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ShipingDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * =======================================
 * @description Charge Type Request
 * =======================================
 */

export interface ChargeTypeRequest {
	readonly chargeBankTransfer?: ChargeBankTransfer
	readonly chargeCreditCard?: ChargeCreditCard
	readonly chargeNon3DS?: ChargeNon3DS
	readonly charge3DS?: Charge3DS
	readonly chargePermata?: ChargePermataVirtualAccount
	readonly chargeBca?: ChargeBcaVirtualAccount
	readonly chargeMandiri?: ChargeMandiriVirtualAccount
	readonly chargeBni?: ChargeBniVirtualAccount
	readonly chargeBri?: ChargeBriVirtualAccount
	readonly chargeBcaKlikPay?: ChargeBcaKlikpay
	readonly chargeKlikBca?: ChargeKlikBca
	readonly chargeBriEpay?: ChargeBriEpay
	readonly chargeChimbClick?: ChargeCimbClick
	readonly chargeDanamonOnline?: ChargeDanamonOnline
	readonly chargeQris?: ChargeQris
	readonly chargeGopay?: ChargeGopay
	readonly chargeShopeePay?: ChargeShoopePay
	readonly chargeIndomaret?: ChargeIndomaret
	readonly chargeAlfamart?: ChargeAlfamart
	readonly chargeAkuLaku?: ChargeAkuLaku
}

/*
 * =======================================
 * @description Capture Request
 * =======================================
 */

export interface CaptureRequest {
	readonly transaction_id: string
	readonly gross_amount?: number
}

/*
 * =======================================
 * @description Card Token Request
 * =======================================
 */

export interface CardTokenRequest {
	readonly card_number: string
	readonly card_exp_month: string
	readonly card_exp_year: any
	readonly card_cvv: string
	readonly client_key: string
}

/*
 * =======================================
 * @description Card Register Request
 * =======================================
 */

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
