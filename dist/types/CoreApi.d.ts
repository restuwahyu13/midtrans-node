export interface CoreApiOptions {
    readonly isProduction: boolean;
    readonly serverKey: string;
    readonly clientKey: string;
}
declare type TransactionDetailOptions = {
    readonly order_id: string;
    readonly gross_amount: number;
};
declare type BillingAddressOptions = {
    readonly first_name?: string;
    readonly last_name?: string;
    readonly emai?: string;
    readonly phone?: string;
    readonly address: string;
    readonly city: string;
    readonly postal_code: string;
    readonly country_code?: string;
};
declare type ItemDetailsOptions = {
    readonly id?: string;
    readonly price: number;
    readonly quantity: number;
    readonly name: string;
    readonly brand?: string;
    readonly category?: string;
    readonly merchant_name?: string;
    readonly tenor?: number;
    readonly code_plan?: number;
    readonly mid?: number;
};
declare type ChargeCustomerDetailOptions = {
    readonly first_name: string;
    readonly last_name: string;
    readonly email: string;
    readonly phone: string;
    readonly billing_address?: BillingAddressOptions;
};
declare type ShipingDetailOptions = {
    readonly first_name: string;
    readonly last_name: string;
    readonly email: string;
    readonly phone: string;
    readonly billing_address?: BillingAddressOptions;
};
declare type DynamicDescriptorOptions = {
    readonly merchant_name: string;
    readonly city_name: string;
    readonly country_code: string;
};
declare type CreditCardOptions = {
    readonly token_id: string;
    readonly bank?: string;
    readonly installment_term?: number;
    readonly bins?: string[];
    readonly type?: string;
    readonly save_token_id?: boolean;
    readonly authentication?: boolean;
};
declare type ChargeBankOptions = {
    readonly bank: string;
};
declare type ChargeBankTransfer = {
    readonly payment_type: string;
    readonly bank_transfer: ChargeBankOptions;
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly custom_field1?: Record<string, any>;
    readonly custom_field2?: Record<string, any>;
    readonly custom_field3?: Record<string, any>;
};
declare type ChargeCreditCard = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly credit_card: CreditCardOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
};
declare type CreditCardOptionsNon3DS = {
    readonly number: string;
    readonly expiry_month: string;
    readonly expiry_year: string;
    readonly cvv?: string;
    readonly merchant_name?: string;
    readonly city_name?: string;
    readonly country_code?: string;
};
declare type ChargeNon3DS = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly credit_card: {
        readonly card: CreditCardOptionsNon3DS;
        readonly dynamic_descriptor?: DynamicDescriptorOptions;
    };
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
};
declare type CreditCardOptions3DSOptions = {
    readonly number: string;
    readonly expiry_month: string;
    readonly expiry_year: string;
    readonly cvv?: string;
    readonly merchant_name?: string;
    readonly city_name?: string;
    readonly country_code?: string;
};
declare type Charge3DS = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly credit_card: {
        readonly card: CreditCardOptions3DSOptions;
        readonly dynamic_descriptor?: DynamicDescriptorOptions;
        readonly authentication?: boolean;
        readonly callback_type?: string;
    };
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
};
declare type SubPermataOptions = {
    readonly recipient_name?: string;
};
declare type BankTransferPermataOptions = {
    readonly bank: string;
    readonly permata?: SubPermataOptions;
};
declare type ChargePermataVirtualAccount = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly bank_transfer: BankTransferPermataOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type InquiryPaymentOptions = {
    readonly id: string;
    readonly en: string;
};
declare type FreeTextOptions = {
    readonly inquiry?: InquiryPaymentOptions[];
    readonly payment?: InquiryPaymentOptions[];
};
declare type BcaOptions = {
    readonly sub_company_code?: string;
};
declare type BankTransferBcaOptions = {
    readonly bank: string;
    readonly va_number?: number;
    readonly free_text?: FreeTextOptions;
    readonly bca?: BcaOptions;
};
declare type ChargeBcaVirtualAccount = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly bank_transfer: BankTransferBcaOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type EchannelOptions = {
    readonly bill_info1: string;
    readonly bill_info2: string;
    readonly bill_info3?: string;
    readonly bill_info4?: string;
    readonly bill_info5?: string;
    readonly bill_info6?: string;
    readonly bill_info7?: string;
    readonly bill_info8?: string;
};
declare type ChargeMandiriVirtualAccount = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly echannel: EchannelOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type BankTransferBniOptions = {
    readonly bank: string;
    readonly va_number?: string;
};
declare type ChargeBniVirtualAccount = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly bank_transfer: BankTransferBniOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type BankTransferBriOptions = {
    readonly bank: string;
    readonly va_number?: string;
};
declare type ChargeBriVirtualAccount = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly bank_transfer: BankTransferBriOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type KlikPayOptions = {
    readonly description: string;
    readonly misc_fee?: string;
};
declare type ChargeBcaKlikpay = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly bca_klikpay: KlikPayOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type KlikBcaOptions = {
    readonly description: string;
    readonly user_id: string;
};
declare type ChargeKlikBca = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly bca_klikbca: KlikBcaOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type ChargeBriEpay = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type CimbClickOptions = {
    readonly description: string;
};
declare type ChargeCimbClick = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly cimb_clicks: CimbClickOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
};
declare type ChargeDanamonOnline = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type QrisOptions = {
    readonly acquirer: string;
};
declare type ChargeQris = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly qris?: QrisOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type GopayOptions = {
    readonly enable_callback?: boolean;
    readonly callback_url?: string;
    readonly account_id: string;
    readonly payment_option_token: string;
    readonly pre_auth?: boolean;
};
declare type ChargeGopay = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly gopay: GopayOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type ShoopeOptions = {
    readonly callback_url: string;
};
declare type ChargeShoopePay = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly shopeepay?: ShoopeOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type IndomartCsStoreOptions = {
    readonly store: string;
    readonly message?: string;
};
declare type ChargeIndomaret = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly cstore: IndomartCsStoreOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type AlfamartCsStoreOptions = {
    readonly store: string;
    readonly alfamart_free_text_1?: string;
    readonly alfamart_free_text_2?: string;
    readonly alfamart_free_text_3?: string;
};
declare type ChargeAlfamart = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly cstore: AlfamartCsStoreOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
declare type ChargeAkuLaku = {
    readonly payment_type: string;
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions[];
    readonly customer_details?: ChargeCustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly order_time?: string;
    readonly expiry_duration?: string;
    readonly unit?: string;
};
export interface ChargeTypeRequest {
    readonly chargeBankTransfer?: ChargeBankTransfer;
    readonly chargeCreditCard?: ChargeCreditCard;
    readonly chargeNon3DS?: ChargeNon3DS;
    readonly charge3DS?: Charge3DS;
    readonly chargePermata?: ChargePermataVirtualAccount;
    readonly chargeBca?: ChargeBcaVirtualAccount;
    readonly chargeMandiri?: ChargeMandiriVirtualAccount;
    readonly chargeBni?: ChargeBniVirtualAccount;
    readonly chargeBri?: ChargeBriVirtualAccount;
    readonly chargeBcaKlikPay?: ChargeBcaKlikpay;
    readonly chargeKlikBca?: ChargeKlikBca;
    readonly chargeBriEpay?: ChargeBriEpay;
    readonly chargeChimbClick?: ChargeCimbClick;
    readonly chargeDanamonOnline?: ChargeDanamonOnline;
    readonly chargeQris?: ChargeQris;
    readonly chargeGopay?: ChargeGopay;
    readonly chargeShopeePay?: ChargeShoopePay;
    readonly chargeIndomaret?: ChargeIndomaret;
    readonly chargeAlfamart?: ChargeAlfamart;
    readonly chargeAkuLaku?: ChargeAkuLaku;
}
export interface CaptureRequest {
    readonly transaction_id: string;
    readonly gross_amount?: number;
}
export interface CardTokenRequest {
    readonly card_number: string;
    readonly card_exp_month: string;
    readonly card_exp_year: any;
    readonly card_cvv: string;
    readonly client_key: string;
}
export interface CardRegisterRequest {
    readonly card_number: string;
    readonly card_exp_month: string;
    readonly card_exp_year: string;
    readonly client_key: string;
    readonly callback?: (status_code?: number | number, status_message?: string, validation_messages?: Array<any>, token_id?: string) => void;
}
export {};
