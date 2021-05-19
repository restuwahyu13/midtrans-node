"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchSnap = void 0;
const matchSnap = (type) => {
    return [
        'snapCreditCard',
        'snapFull',
        'snapBca',
        'snapPermata',
        'snapBni',
        'snapBri',
        'snapGopay',
        'snapKlikBca',
        'snapBcaKlikPay',
        'snapCimbKlik',
        'snapDanamonOnline',
        'snapBriEpay',
        'snapIndomaret',
        'snapAlfamart',
        'snapAkuLaku',
        'snapShopeePay'
    ].includes(type);
};
exports.matchSnap = matchSnap;
