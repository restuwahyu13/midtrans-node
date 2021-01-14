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

type TransactionDetailRequest = {
	readonly order_id: string
	readonly gross_amount: number
}

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
	readonly billing_address?: SubChargeCustomerDetailRequest
}

type SubDynamicDescriptor = {
	readonly merchant_name: string
	readonly city_name: string
	readonly country_code: string
}

/*
 * ====================================
 * @description Charge Custom Request
 * ====================================
 */

type ChargeBankRequest = {
	readonly bank: string
}

type ChargeCustom = {
	readonly payment_type: string
	readonly bank_transfer: ChargeBankRequest
	readonly transaction_details: TransactionDetailRequest
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
	readonly custom_field1?: Record<string, any>
	readonly custom_field2?: Record<string, any>
	readonly custom_field3?: Record<string, any>
}

/*
 * =============================================
 * @description Charge Full Credit Card Request
 * ============================================
 */

type SubCreditCardRequest = {
	readonly number: string
	readonly expiry_month: string
	readonly expiry_year: string
	readonly cvv: string
}

type ChargeFullCreditCard = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly credit_card: {
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

type SubCreditCard3DRequest = {
	readonly token_id: string
	readonly bank: string
	readonly authentication: boolean
}

type Charge3DSecure = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly credit_card: SubCreditCard3DRequest
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * =======================================
 * @description Charge Bin Promo Request
 * =======================================
 */

type SubCreditCardBinPromoRequest = {
	readonly token_id: string
	readonly bank: string
	readonly authentication: boolean
}

type ChargeBinPromo = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly credit_card: SubCreditCardBinPromoRequest
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * =======================================
 * @description Charge Installment Request
 * =======================================
 */

type SubCreditCardInstallmentRequest = {
	readonly token_id: string
	readonly bank: string
	readonly installment_term: number
}

type ChargeInstallment = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly credit_card: SubCreditCardInstallmentRequest
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description Charge Pre Authorization Request
 * ==============================================
 */

type SubCreditCardPreAuthRequest = {
	readonly token_id: string
	readonly bank: string
	readonly type: string
}

type ChargePreAuth = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly credit_card: SubCreditCardPreAuthRequest
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description Charge One Click Request
 * ==============================================
 */

type SubCreditCardOneClick = {
	readonly token_id: string
	readonly save_token_id: boolean
}

type ChargeOneClick = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly credit_card: SubCreditCardOneClick
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description Charge Two Click Request
 * ==============================================
 */

type SubCreditCardTwoClick = {
	readonly token_id: string
	readonly save_token_id: boolean
}

type ChargeTwoClick = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly credit_card: SubCreditCardTwoClick
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description Charge Point Request
 * ==============================================
 */

type SubCreditCardPoint = {
	readonly token_id: string
	readonly point_redeem_amount: number
}

type ChargePoint = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly credit_card: SubCreditCardPoint
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description Charge Non 3DS Integration Request
 * ==============================================
 */

type SubCreditCardNon3DS = {
	readonly number: string
	readonly expiry_month: string
	readonly expiry_year: string
	readonly cvv: string
}

type ChargeNon3DS = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly credit_card: {
		readonly card: SubCreditCardNon3DS
		readonly dynamic_descriptor?: SubDynamicDescriptor
	}
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description Charge 3DS Integration Request
 * ==============================================
 */

type SubCreditCard3DS = {
	readonly number: string
	readonly expiry_month: string
	readonly expiry_year: string
	readonly cvv: string
}

type Charge3DS = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly credit_card: {
		readonly card: SubCreditCard3DS
		readonly dynamic_descriptor?: SubDynamicDescriptor
	}
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description Permata Virtual Account Request
 * ==============================================
 */

type SubPermataOptions = {
	readonly recipient_name: string
}

type SubBankTransferPermata = {
	readonly bank: string
	readonly permata: SubPermataOptions
}

type ChargePermataVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransferPermata
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
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
	readonly inquiry: SubInquiryPaymentOptions[]
	readonly payment: SubInquiryPaymentOptions[]
}

type SubBcaOptions = {
	readonly sub_company_code: string
}

type SubBankTransferBca = {
	readonly bank: string
	readonly va_number: number
	readonly free_text?: SubFreeTextOptions
	readonly bca?: SubBcaOptions
}

type ChargeBcaVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransferBca
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description BNI Virtual Account Request
 * ==============================================
 */

type SubBankTransBni = {
	readonly bank: string
	readonly va_number: string
}

type ChargeBniVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBni
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description BRI Virtual Account Request
 * ==============================================
 */

type SubBankTransBri = {
	readonly bank: string
	readonly va_number: string
}

type ChargeBriVirtualAccount = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBri
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description BCA Klikpay Request
 * ==============================================
 */

type SubBcaKlikPayOptions = {
	readonly description: string
}

type ChargeBcaKlikpay = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBri
	readonly bca_klikpay?: SubBcaKlikPayOptions
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
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
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBri
	readonly bca_klikbca?: SubBcaKlikBcaOptions
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description BRI Epay Request
 * ==============================================
 */

type ChargeBriEpay = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBri
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description Cimb Click Request
 * ==============================================
 */

type ChargeCimbClick = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBri
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description Danamon Online Request
 * ==============================================
 */

type ChargeDanamonOnline = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBri
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
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
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBri
	readonly qris?: SubQrisOptions
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description Gopay Request
 * ==============================================
 */

type SubGopayOptions = {
	readonly enable_callback: boolean
	readonly callback_url: string
	readonly account_id: string
	readonly payment_option_token: string
}

type ChargeGopay = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBri
	readonly gopay: SubGopayOptions
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
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
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBri
	readonly shopeepay: SubShoopeOptions
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}
/*
 * ==============================================
 * @description Indomaret Pay Request
 * ==============================================
 */

type SubIndomaretOptions = {
	readonly store: string
	readonly message: string
}

type ChargeIndomaret = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBri
	readonly cstore: SubIndomaretOptions
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
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
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBri
	readonly cstore: SubAlfamartOptions
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * ==============================================
 * @description Akulaku Request
 * ==============================================
 */

type ChargeAkuLaku = {
	readonly payment_type: string
	readonly transaction_details: TransactionDetailRequest
	readonly bank_transfer: SubBankTransBri
	readonly item_details?: SubItemDetails[]
	readonly customer_details?: ChargeCustomerDetailRequest
	readonly shipping_address?: ChargeCustomerDetailRequest
}

/*
 * =======================================
 * @description Charge Type Request
 * =======================================
 */

export interface ChargeTypeRequest {
	readonly charge: ChargeCustom
	readonly chargeCreditCardFull?: ChargeFullCreditCard
	readonly charge3DSecure?: Charge3DSecure
	readonly chargeBinPromo?: ChargeBinPromo
	readonly chargeInstallment?: ChargeInstallment
	readonly chargePreAuth?: ChargePreAuth
	readonly chargeOneClick?: ChargeOneClick
	readonly chargeTwoClick?: ChargeTwoClick
	readonly chargePoint?: ChargePoint
	readonly chargeNon3DS?: ChargeNon3DS
	readonly charge3DS?: Charge3DS
	readonly chargePermata?: ChargePermataVirtualAccount
	readonly chargeBca?: ChargeBcaVirtualAccount
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
	readonly gross_amount: number
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
