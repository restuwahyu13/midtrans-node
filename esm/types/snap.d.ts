export interface SnapOptions {
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
declare type CustomerDetailOptions = {
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
declare type InstallmentOptions = {
    readonly required: boolean;
    readonly terms: Record<string, number[]>;
};
declare type CreditCardOptions = {
    readonly secure?: boolean;
    readonly bank: string;
    readonly channel?: string;
    readonly type?: string;
    readonly whitelist_bins?: string[];
    readonly installment?: InstallmentOptions;
    readonly dynamic_descriptor?: DynamicDescriptorOptions;
};
interface SnapCreditCard {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
    readonly credit_card?: CreditCardOptions;
}
declare type FreeTextOptions = {
    readonly inquiry: Record<string, string>;
    readonly payment: Record<string, string>;
};
declare type BcaVtOptions = {
    readonly va_number: boolean;
    readonly sub_company_code?: string;
    readonly free_text?: FreeTextOptions;
};
interface SnapBcaVirtualAccount {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
    readonly bca_va?: BcaVtOptions;
}
declare type PermataVTOptions = {
    readonly va_number: boolean;
    readonly recipient_name?: string;
};
interface SnapPermataVirtualAccount {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
    readonly permata_va?: PermataVTOptions;
}
declare type BniVTOptions = {
    readonly va_number: boolean;
};
interface SnapBniVirtualAccount {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
    readonly bni_va?: BniVTOptions;
}
declare type BriVTOptions = {
    readonly va_number: boolean;
};
interface SnapBriVirtualAccount {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
    readonly bri_va?: BriVTOptions;
}
interface SnapMandiriVirtualAccount {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
}
declare type GopayOptions = {
    readonly enable_callback?: boolean;
    readonly callback_url?: string;
};
interface SnapGopay {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
    readonly gopay?: GopayOptions;
}
interface SnapKlikBCA {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
}
interface SnapBcaKlikPay {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
}
interface SnapCimbKlik {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
}
interface SnapDanamonOnlineBanking {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
}
interface SnapBriEpay {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
}
interface SnapIndomaret {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
}
interface SnapAlfamart {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
}
interface SnapAkuLaku {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
}
declare type ShopeePayOptions = {
    readonly callback_url: string;
};
interface SnapShopeePay {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
    readonly shopeepay?: ShopeePayOptions;
}
declare type CallbacksOptions = {
    readonly finish: string;
};
declare type ExpiryOptions = {
    readonly start_time: string;
    readonly unit: string;
    readonly duration: number;
};
interface SnapFull {
    readonly transaction_details: TransactionDetailOptions;
    readonly item_details?: ItemDetailsOptions;
    readonly customer_details?: CustomerDetailOptions;
    readonly shipping_address?: ShipingDetailOptions;
    readonly enabled_payments?: string[];
    readonly credit_card?: CreditCardOptions;
    readonly whitelist_bins?: string[];
    readonly dynamic_descriptor?: DynamicDescriptorOptions;
    readonly bca_va?: BcaVtOptions;
    readonly bri_va?: BriVTOptions;
    readonly permata_va?: PermataVTOptions;
    readonly shopeepay?: ShopeePayOptions;
    readonly callbacks: CallbacksOptions;
    readonly expiry?: ExpiryOptions;
    readonly custom_field1?: string;
    readonly custom_field2?: string;
    readonly custom_field3?: string;
}
export interface TransactionRequestType {
    readonly snapCreditCard?: SnapCreditCard;
    readonly snapFull?: SnapFull;
    readonly snapBca?: SnapBcaVirtualAccount;
    readonly snapPermata?: SnapPermataVirtualAccount;
    readonly snapBni?: SnapBniVirtualAccount;
    readonly snapBri?: SnapBriVirtualAccount;
    readonly snapMandiri?: SnapMandiriVirtualAccount;
    readonly snapGopay?: SnapGopay;
    readonly snapKlikBca?: SnapKlikBCA;
    readonly snapBcaKlikPay?: SnapBcaKlikPay;
    readonly snapCimbKlik?: SnapCimbKlik;
    readonly snapDanamonOnline?: SnapDanamonOnlineBanking;
    readonly snapBriEpay?: SnapBriEpay;
    readonly snapIndomaret?: SnapIndomaret;
    readonly snapAlfamart?: SnapAlfamart;
    readonly snapAkuLaku?: SnapAkuLaku;
    readonly snapShopeePay?: SnapShopeePay;
}
export {};
