import { CoreApi as MidtransCoreApi } from './../src/lib/coreApi'
import { config } from './../config'

let coreApi
let tokenId = ''
let savedTokenId = ''
let apiResponse = {}
let reuseOrderId

describe('Midtrands Core API', () => {
	beforeEach(() => {
		coreApi = new MidtransCoreApi(generateConfig())
		reuseOrderId = [
			'node-midtransclient-test1-' + generateTimestamp(),
			'node-midtransclient-test2-' + generateTimestamp(),
			'node-midtransclient-test3-' + generateTimestamp()
		]
	})
	it('class should be working', () => {
		expect(coreApi instanceof MidtransCoreApi).toBeTruthy()
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
			card_exp_year: new Date().getFullYear() + 1 + '',
			card_cvv: '123',
			client_key: coreApi.apiConfig.get().clientKey
		})

		expect(typeof res.status_code).toStrictEqual('string')
		expect(typeof res.token_id).toStrictEqual('string')
		expect(res.status_code).toStrictEqual('200')
		tokenId = res.token_id

		done()
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
		bank_transfer: {
			bank: 'bca'
		}
	}
}

// function generateCCParamMin(orderId = null, tokenId = null) {
// 	return {
// 		payment_type: 'credit_card',
// 		transaction_details: {
// 			gross_amount: 12145,
// 			order_id: orderId == null ? 'node-midtransclient-test-' + generateTimestamp() : orderId
// 		},
// 		credit_card: {
// 			token_id: tokenId
// 		}
// 	}
// }

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
