import { CoreApi } from '../src/lib/coreApi'
import { config } from '../config'

let coreApi
let tokenId = ''
let savedTokenId = ''
let reuseOrderId = [
	'node-midtransclient-test1-' + generateTimestamp(),
	'node-midtransclient-test2-' + generateTimestamp(),
	'node-midtransclient-test3-' + generateTimestamp()
]
let apiResponse = {}

describe('Midtrands Core API', () => {
	beforeEach(() => {
		coreApi = new CoreApi(generateConfig())
	})
	it('class should be working', () => {
		expect(coreApi instanceof CoreApi).toBeTruthy()
		expect(typeof coreApi.charge).toStrictEqual('function')
		expect(typeof coreApi.capture).toStrictEqual('function')
		expect(typeof coreApi.cardRegister).toStrictEqual('function')
		expect(typeof coreApi.cardToken).toStrictEqual('function')
		expect(typeof coreApi.cardPointInquiry).toStrictEqual('function')
		expect(typeof coreApi.apiConfig.get().serverKey).toStrictEqual('string')
		expect(typeof coreApi.apiConfig.get().clientKey).toStrictEqual('string')
	})

	it('able to get cc token', async (done) => {
		const res = await coreApi.cardToken({
			card_number: '5264 2210 3887 4659',
			card_exp_month: '12',
			card_exp_year: `${new Date().getFullYear() + 1}`,
			card_cvv: '123',
			client_key: coreApi.apiConfig.get().clientKey
		})

		expect(typeof res.status_code).toStrictEqual('string')
		expect(typeof res.token_id).toStrictEqual('string')
		expect(res.status_code).toStrictEqual('200')
		tokenId = res.token_id
		done()
	})

	it('able to card register cc', async (done) => {
		const res = await coreApi.cardRegister({
			card_number: '4811 1111 1111 1114',
			card_exp_month: '12',
			card_exp_year: `${new Date().getFullYear() + 1}`,
			card_cvv: '123',
			client_key: coreApi.apiConfig.get().clientKey
		})

		expect(typeof res.status_code).toStrictEqual('string')
		expect(typeof res.saved_token_id).toStrictEqual('string')
		expect(res.status_code).toStrictEqual('200')
		savedTokenId = res.saved_token_id
		done()
	})

	it('fail to card point inquiry 402', () => {
		return coreApi.cardPointInquiry(tokenId).catch((e) => {
			expect(e.httpStatusCode).toStrictEqual('402')
		})
	})

	it('able to charge cc simple', async (done) => {
		const parameter = generateCCParamMin(reuseOrderId[1], tokenId)
		const res = await coreApi.charge(parameter)
		expect(res.status_code).toStrictEqual('200')
		expect(res.transaction_status).toStrictEqual('capture')
		expect(res.fraud_status).toStrictEqual('accept')
		done()
	})

	it('able to charge cc one click', async (done) => {
		const parameter = generateCCParamMin(reuseOrderId[2], savedTokenId)
		const res = await coreApi.charge(parameter)
		expect(res.status_code).toStrictEqual('200')
		expect(res.transaction_status).toStrictEqual('capture')
		expect(res.fraud_status).toStrictEqual('accept')
		done()
	})

	it('able to charge bank transfer BCA VA simple', async (done) => {
		const res = await coreApi.charge(generateParamMin(reuseOrderId[0]))
		expect(typeof res.status_code).toStrictEqual('string')
		expect(res.status_code).toStrictEqual('201')
		expect(typeof res.transaction_status).toStrictEqual('string')
		expect(res.transaction_status).toStrictEqual('pending')
		done()
	})

	it('able to status', async (done) => {
		const res = await coreApi.transaction.status(reuseOrderId[0])
		apiResponse = res
		expect(res.status_code).toStrictEqual('201')
		expect(res.transaction_status).toStrictEqual('pending')
		done()
	})

	// // TODO test statusb2b

	it('able to notification from object', async (done) => {
		const res = await coreApi.transaction.notification(apiResponse)
		expect(res.status_code).toStrictEqual('201')
		expect(res.transaction_status).toStrictEqual('pending')
		done()
	})

	it('able to notification from json string', async (done) => {
		const res = await coreApi.transaction.notification(JSON.stringify(apiResponse))
		expect(res.status_code).toStrictEqual('201')
		expect(res.transaction_status).toStrictEqual('pending')
		done()
	})

	it('able to throw exception notification from empty string', () => {
		return coreApi.transaction.notification('').catch((e) => {
			expect(e.message).toMatch(/fail to parse/)
		})
	})

	// it('able to expire', async (done) => {
	// 	const res = await coreApi.transaction.expire(reuseOrderId[0])
	// 	expect(res.status_code).toStrictEqual('407')
	// 	expect(res.transaction_status).toStrictEqual('expire')
	// 	done()
	// })

	it('fail to approve transaction that cannot be updated', () => {
		return coreApi.transaction.approve(reuseOrderId[1]).catch((e) => {
			expect(e.message).toMatch(/412/)
		})
	})

	it('fail to deny transaction that cannot be updated', () => {
		return coreApi.transaction.deny(reuseOrderId[1]).catch((e) => {
			expect(e.message).toMatch(/412/)
		})
	})

	it('able to cancel', async (done) => {
		const res = await coreApi.transaction.cancel(reuseOrderId[1])
		expect(res.status_code).toStrictEqual('200')
		expect(res.transaction_status).toStrictEqual('cancel')
		done()
	})

	it('fail to refund non settlement transaction', () => {
		const parameter = { amount: 5000, reason: 'for some reason' }
		return coreApi.transaction.refund(reuseOrderId[2], parameter).catch((e) => {
			expect(e.message).toMatch(/412/)
		})
	})

	it('fail to direct refund non settlement transaction', () => {
		const parameter = { amount: 5000, reason: 'for some reason' }
		return coreApi.transaction.refundDirect(reuseOrderId[2], parameter).catch((e) => {
			expect(e.message).toMatch(/412/)
		})
	})

	it('fail to status 404 non exists transaction', () => {
		return coreApi.transaction.status('non-exists-transaction').catch((e) => {
			expect(e.message).toMatch(/404/)
		})
	})

	it('able to re-set serverKey via setter', () => {
		const spyCoreApi = jest.spyOn(coreApi.apiConfig, 'get')
		coreApi.apiConfig.get()

		expect(spyCoreApi).toHaveBeenCalled()
		expect(spyCoreApi).toHaveBeenCalledTimes(1)
		expect(coreApi.apiConfig.get().serverKey).toStrictEqual(config.serverKey)
		coreApi.apiConfig.set({ serverKey: '', clientKey: 'abc' })
		expect(coreApi.apiConfig.get().isProduction).toBeFalsy()
		expect(coreApi.apiConfig.get().serverKey).toStrictEqual('')
		expect(coreApi.apiConfig.get().clientKey).toStrictEqual('abc')
	})

	it('able to re-set serverKey via property', () => {
		const spyCoreApi = jest.spyOn(coreApi.apiConfig, 'get')
		coreApi.apiConfig.get()

		expect(spyCoreApi).toHaveBeenCalled()
		expect(spyCoreApi).toHaveBeenCalledTimes(1)
		expect(coreApi.apiConfig.get().serverKey).toStrictEqual(config.serverKey)
		coreApi.apiConfig.serverKey = ''
		coreApi.apiConfig.clientKey = 'abc'
		expect(coreApi.apiConfig.get().isProduction).toBeFalsy()
		expect(coreApi.apiConfig.get().serverKey).toStrictEqual('')
		expect(coreApi.apiConfig.get().clientKey).toStrictEqual('abc')
	})

	it('fail to charge 401 with no serverKey', () => {
		return coreApi.charge(generateParamMin()).catch((e) => {
			expect(e.message).toMatch(/401/)
		})
	})

	it('fail to charge 400 with empty param', () => {
		return coreApi.charge(null).catch((e) => {
			expect(e.message).toMatch(/400/)
		})
	})

	it('fail to charge 400 with zero gross_amount', () => {
		const parameter = generateParamMin()
		parameter.transaction_details.gross_amount = 0
		return coreApi.charge(parameter).catch((e) => {
			expect(e.message).toMatch(/400/)
		})
	})

	it('able to throw custom MidtransError', () => {
		const parameter = generateParamMin()
		parameter.transaction_details.gross_amount = 0
		return coreApi.charge(parameter).catch((e) => {
			expect(e.message).toMatch(/400/)
			expect(typeof e.ApiResponse).toStrictEqual('object')
			expect(e.ApiResponse.validation_messages).toBeInstanceOf(Array)
			expect(typeof e.rawHttpClientData).toStrictEqual('object')
			expect(e.rawHttpClientData).toHaveProperty('data')
		})
	})
})

/**
 * Helper functions
 */

function generateTimestamp(devider = 1) {
	return Math.round(new Date().getTime() / devider)
}

function generateConfig() {
	return {
		isProduction: false,
		serverKey: config.serverKey,
		clientKey: config.clientKey
	}
}

function generateParamMin(orderId = null) {
	return {
		payment_type: 'bank_transfer',
		transaction_details: {
			gross_amount: 44145,
			order_id: orderId == null ? 'node-midtransclient-test-' + generateTimestamp() : orderId
		},
		bank_transfer: { bank: 'bca' }
	}
}

function generateCCParamMin(orderId = null, tokenId = null) {
	return {
		payment_type: 'credit_card',
		transaction_details: {
			gross_amount: 12145,
			order_id: orderId == null ? 'node-midtransclient-test-' + generateTimestamp() : orderId
		},
		credit_card: { token_id: tokenId }
	}
}

// function generateParamMax() {
// 	return {
// 		transaction_details: {
// 			order_id: 'node-midtransclient-test-' + generateTimestamp(),
// 			gross_amount: 10000
// 		},
// 		item_details: [
// 			{
// 				id: 'ITEM1',
// 				price: 10000,
// 				quantity: 1,
// 				name: 'Midtrans Bear',
// 				brand: 'Midtrans',
// 				category: 'Toys',
// 				merchant_name: 'Midtrans'
// 			}
// 		],
// 		customer_details: {
// 			first_name: 'John',
// 			last_name: 'Watson',
// 			email: 'test@example.com',
// 			phone: '+628123456',
// 			billing_address: {
// 				first_name: 'John',
// 				last_name: 'Watson',
// 				email: 'test@example.com',
// 				phone: '081 2233 44-55',
// 				address: 'Sudirman',
// 				city: 'Jakarta',
// 				postal_code: '12190',
// 				country_code: 'IDN'
// 			},
// 			shipping_address: {
// 				first_name: 'John',
// 				last_name: 'Watson',
// 				email: 'test@example.com',
// 				phone: '0 8128-75 7-9338',
// 				address: 'Sudirman',
// 				city: 'Jakarta',
// 				postal_code: '12190',
// 				country_code: 'IDN'
// 			}
// 		},
// 		enabled_payments: [
// 			'credit_card',
// 			'mandiri_clickpay',
// 			'cimb_clicks',
// 			'bca_klikbca',
// 			'bca_klikpay',
// 			'bri_epay',
// 			'echannel',
// 			'indosat_dompetku',
// 			'mandiri_ecash',
// 			'permata_va',
// 			'bca_va',
// 			'bni_va',
// 			'other_va',
// 			'gopay',
// 			'kioson',
// 			'indomaret',
// 			'gci',
// 			'danamon_online'
// 		],
// 		credit_card: {
// 			secure: true,
// 			channel: 'migs',
// 			bank: 'bca',
// 			installment: {
// 				required: false,
// 				terms: {
// 					bni: [3, 6, 12],
// 					mandiri: [3, 6, 12],
// 					cimb: [3],
// 					bca: [3, 6, 12],
// 					offline: [6, 12]
// 				}
// 			},
// 			whitelist_bins: ['48111111', '41111111']
// 		},
// 		bca_va: {
// 			va_number: '12345678911',
// 			free_text: {
// 				inquiry: [
// 					{
// 						en: 'text in English',
// 						id: 'text in Bahasa Indonesia'
// 					}
// 				],
// 				payment: [
// 					{
// 						en: 'text in English',
// 						id: 'text in Bahasa Indonesia'
// 					}
// 				]
// 			}
// 		},
// 		bni_va: {
// 			va_number: '12345678'
// 		},
// 		permata_va: {
// 			va_number: '1234567890',
// 			recipient_name: 'SUDARSONO'
// 		},
// 		callbacks: {
// 			finish: 'https://demo.midtrans.com'
// 		},
// 		expiry: {
// 			start_time: new Date().getFullYear() + 1 + '-12-20 18:11:08 +0700',
// 			unit: 'minutes',
// 			duration: 1
// 		},
// 		custom_field1: 'custom field 1 content',
// 		custom_field2: 'custom field 2 content',
// 		custom_field3: 'custom field 3 content'
// 	}
// }
