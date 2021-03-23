"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchCharge = void 0;
const matchCharge = (type) => {
    return [
        'chargeBankTransfer',
        'chargeCreditCard',
        'chargeNon3DS',
        'Charge3DS',
        'chargePermata',
        'chargeBca',
        'chargeMandiri',
        'chargeBni',
        'chargeBri',
        'chargeBcaKlikPay',
        'chargeKlikBca',
        'chargeBriEpay',
        'chargeChimbClick',
        'chargeDanamonOnline',
        'chargeQris',
        'chargeGopay',
        'chargeShopeePay',
        'chargeIndomaret',
        'chargeAlfamart',
        'chargeAkuLaku'
    ].includes(type);
};
exports.matchCharge = matchCharge;
