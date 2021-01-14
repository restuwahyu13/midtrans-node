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

type SubChargeCustomerDetailOptions = {
	readonly first_name: string
	readonly last_name: string
	readonly email: string
	readonly phone: string
	readonly address: string
	readonly city: string
	readonly postal_code: string
	readonly country_code: string
}

type SubItemDetailsOptions = {
	readonly id?: string
	readonly price: number
	readonly quantity: number
	readonly name: string
	readonly brand?: string
	readonly category?: string
	readonly merchant_name?: string
	/**
	 * @descript For BCA Klikpay
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
	readonly billing_address?: SubChargeCustomerDetailOptions
}

type SubDynamicDescriptorOptions = {
	readonly merchant_name: string
	readonly city_name: string
	readonly country_code: string
}

type SubCreditCardOptions = {
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
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
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
	readonly credit_card: SubCreditCardOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
}

/*
 * ==============================================
 * @description Charge Non 3DS Integration Request
 * ==============================================
 */

type SubCreditCardOptionsNon3DS = {
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
		readonly card: SubCreditCardOptionsNon3DS
		readonly dynamic_descriptor?: SubDynamicDescriptorOptions
	}
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
}

/*
 * ==============================================
 * @description Charge 3DS Integration Request
 * ==============================================
 */

type SubCreditCardOptions3DSOptions = {
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
		readonly card: SubCreditCardOptions3DSOptions
		readonly dynamic_descriptor?: SubDynamicDescriptorOptions
		readonly authentication?: boolean
		readonly callback_type?: string
	}
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
}

/*
 * ==============================================
 * @description Permata Virtual Account Request
 * ==============================================
 */

type SubPermataOptions = {
	readonly recipient_name?: string
}

type SubBankTransferPermataOptions = {
	readonly bank: string
	readonly permata?: SubPermataOptions
}

type ChargePermataVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly bank_transfer: SubBankTransferPermataOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description BCA Virtual Account Request
 * ==============================================
 */

type SubInquiryPaymentOptions = {
	readonly id: string
	readonly en: string
}

type SubFreeTextOptions = {
	readonly inquiry?: SubInquiryPaymentOptions[]
	readonly payment?: SubInquiryPaymentOptions[]
}

type SubBcaOptions = {
	readonly sub_company_code?: string
}

type SubBankTransferBcaOptions = {
	readonly bank: string
	readonly va_number?: number
	readonly free_text?: SubFreeTextOptions
	readonly bca?: SubBcaOptions
}

type ChargeBcaVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly bank_transfer: SubBankTransferBcaOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Mandiri Virtual Account Request
 * ==============================================
 */

type SubEchannelOptions = {
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
	readonly echannel: SubEchannelOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description BNI Virtual Account Request
 * ==============================================
 */

type SubBankTransferBniOptions = {
	readonly bank: string
	readonly va_number?: string
}

type ChargeBniVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly bank_transfer: SubBankTransferBniOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description BRI Virtual Account Request
 * ==============================================
 */

type SubBankTransferBriOptions = {
	readonly bank: string
	readonly va_number?: string
}

type ChargeBriVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly bank_transfer: SubBankTransferBriOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description BCA Klikpay Request
 * ==============================================
 */

type SubBcaKlikPayOptions = {
	readonly description: string
	readonly misc_fee?: string
}

type ChargeBcaKlikpay = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly bca_klikpay: SubBcaKlikPayOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description BCA Klik BCA Request
 * ==============================================
 */

type SubBcaKlikBcaOptions = {
	readonly description: string
	readonly user_id: string
}

type ChargeBcaKliBca = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly bca_klikbca: SubBcaKlikBcaOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
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
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Cimb Click Request
 * ==============================================
 */

type SubCimbClickOptions = {
	readonly description: string
}

type ChargeCimbClick = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly cimb_clicks: SubCimbClickOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
}

/*
 * ==============================================
 * @description Danamon Online Request
 * ==============================================
 */

type ChargeDanamonOnline = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Qris Request
 * ==============================================
 */

type SubQrisOptions = {
	readonly acquirer: string
}

type ChargeQris = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly qris?: SubQrisOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Gopay Request
 * ==============================================
 */

type SubGopayOptions = {
	readonly enable_callback?: boolean
	readonly callback_url?: string
	readonly account_id: string
	readonly payment_option_token: string
	readonly pre_auth?: boolean
}

type ChargeGopay = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly gopay: SubGopayOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Shoope Pay Request
 * ==============================================
 */

type SubShoopeOptions = {
	readonly callback_url: string
}

type ChargeShoopePay = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly shopeepay?: SubShoopeOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}

/*
 * ==============================================
 * @description Indomaret Pay Request
 * ==============================================
 */

type SubIndomaretOptions = {
	readonly store: string
	readonly message?: string
}

type ChargeIndomaret = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly cstore: SubIndomaretOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
	readonly order_time?: string
	readonly expiry_duration?: string
	readonly unit?: string
}
/*
 * ==============================================
 * @description Alfamart Pay Request
 * ==============================================
 */

type SubAlfamartOptions = {
	readonly store: string
	readonly alfamart_free_text_1?: string
	readonly alfamart_free_text_2?: string
	readonly alfamart_free_text_3?: string
}

type ChargeAlfamart = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailOptions
	readonly cstore: SubAlfamartOptions
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
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
	readonly item_details?: SubItemDetailsOptions[]
	readonly customer_details?: ChargeCustomerDetailOptions
	readonly shipping_address?: ChargeCustomerDetailOptions
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
	readonly chargeBankTransfer: ChargeBankTransfer
	readonly chargeCreditCard?: ChargeCreditCard
	readonly chargeNon3DS?: ChargeNon3DS
	readonly charge3DS?: Charge3DS
	readonly chargePermata?: ChargePermataVirtualAccount
	readonly chargeBca?: ChargeBcaVirtualAccount
	readonly chargeMandiri?: ChargeMandiriVirtualAccount
	readonly chargeBni?: ChargeBniVirtualAccount
	readonly chargeBri?: ChargeBriVirtualAccount
	readonly chargeBcaKlikPay?: ChargeBcaKlikpay
	readonly chargeBcaKlikBca?: ChargeBcaKliBca
	readonly chargeBriEpay?: ChargeBriEpay
	readonly chargeChimbClick?: ChargeCimbClick
	readonly chargeDanamonOnline?: ChargeDanamonOnline
	readonly chargeQris?: ChargeQris
	readonly chargeGopay?: ChargeGopay
	readonly chargeShopePay?: ChargeShoopePay
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
	readonly card_exp_year: string
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
