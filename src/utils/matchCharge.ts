export const matchCharge = (type: string): boolean => {
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
	].includes(type)
}
