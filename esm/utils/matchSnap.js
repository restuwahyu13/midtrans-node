export const matchSnap = (type) => {
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
