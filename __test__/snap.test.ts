import { Snap } from '../src/lib/snap'
import { config } from '../config'

describe('Snap', () => {
	let snap

	beforeEach(() => {
		snap = new Snap(generateConfig())
	})

	it('class should be working', () => {
		expect(snap instanceof Snap).toBeTruthy()
		expect(typeof snap.createTransaction).toStrictEqual('function')
		expect(typeof snap.createTransactionToken).toStrictEqual('function')
		expect(typeof snap.createTransactionRedirectUrl).toStrictEqual('function')
		expect(typeof snap.apiConfig.get().serverKey).toStrictEqual('string')
		expect(typeof snap.apiConfig.get().clientKey).toStrictEqual('string')
	})

	it('able to create transaction simple param', async (done) => {
		const res = await snap.createTransaction(generateParamMin())
		expect(res).toHaveProperty('token')
		expect(typeof res.token).toStrictEqual('string')
		expect(res).toHaveProperty('redirect_url')
		expect(typeof res.token).toStrictEqual('string')
		done()
	})

	it('able to create transaction max param', async (done) => {
		const res = await snap.createTransaction(generateParamMax())
		expect(res).toHaveProperty('token')
		expect(typeof res.token).toStrictEqual('string')
		expect(res).toHaveProperty('redirect_url')
		expect(typeof res.token).toStrictEqual('string')
		done()
	})

	it('able to create transaction token', () => {
		const token = snap.createTransactionToken(generateParamMin())
		expect(typeof token).toStrictEqual('string')
	})

	it('able to create transaction redirect_url', async (done) => {
		const redirect_url = await snap.createTransactionRedirectUrl(generateParamMin())
		expect(typeof redirect_url).toStrictEqual('string')
		done()
	})

	it('fail to status transaction 404 with non exists order_id', () => {
		return snap.transaction.status('non exists order_id').catch((e) => expect(e.message).toMatch(/404/))
	})

	// it('able to status transaction', () => {
	// 	let snap = new Snap(generateConfig())
	// 	return snap.transaction.status('node-midtransclient-test-1540974864').then((res) => {
	// 		expect(res.status_code).to.be.a('string')
	// 		expect(res.status_code).to.be.equals('201')
	// 		expect(res.transaction_status).to.be.a('string')
	// 		expect(res.transaction_status).to.be.equals('pending')
	// 	})
	// })

	it('able to re-set serverKey via setter', () => {
		snap.apiConfig.set({ serverKey: '', clientKey: 'abc' })
		expect(snap.apiConfig.get().serverKey).toStrictEqual('')
		snap.apiConfig.set({ serverKey: config.serverKey })
		expect(snap.apiConfig.get().isProduction).toBefalsy()
		expect(snap.apiConfig.get().serverKey).toStrictEqual(config.serverKey)
		expect(snap.apiConfig.get().clientKey).toStrictEqual('abc')
	})

	it('able to re-set serverKey via property', () => {
		snap.apiConfig.serverKey = ''
		snap.apiConfig.clientKey = 'abc'
		expect(snap.apiConfig.get().serverKey).toStrictEqual('')
		snap.apiConfig.serverKey = config.serverKey
		expect(snap.apiConfig.get().isProduction).toBefalsy()
		expect(snap.apiConfig.get().serverKey).toStrictEqual(config.serverKey)
		expect(snap.apiConfig.get().clientKey).toStrictEqual('abc')
	})

	it('fail to status transaction 401 with no serverKey', () => {
		snap.apiConfig.set({ serverKey: '' })
		return snap.transaction.status('non exists order_id').catch((e) => expect(e.message).toMatch(/401/))
	})

	it('fail to create transaction 401 with no serverKey', () => {
		snap.apiConfig.set({ serverKey: '' })
		return snap.transaction.createTransaction(generateParamMin()).catch((e) => expect(e.message).toMatch(/401/))
	})

	it('fail to create transaction 400 with no param', () => {
		return snap.transaction.createTransaction().catch((e) => expect(e.message).toMatch(/401/))
	})

	it('fail to create transaction with zero gross_amount', () => {
		const param = generateParamMin()
		param.transaction_details.gross_amount = 0
		return snap.createTransaction().catch((e) => expect(e.message).toMatch(/400/))
	})

	it('able to throw custom MidtransError', () => {
		const param = generateParamMin()
		param.transaction_details.gross_amount = 0
		return snap.createTransaction().catch((e) => {
			expect(e.message).toMatch(/400/)
			expect(e.httpStatusCode).toStrictEqual(400)
			expect(e.ApiResponse).toBeInstanceOf(Object)
			expect(e.ApiResponse.error_messages).toBeInstanceOf(Array)
			expect(e.rawHttpClientData).toBeInstanceOf(Object)
			expect(e.rawHttpClientData).toHaveProperty('data')
		})
	})

	// 	it('able to set X-Override-Notification request header via exposed http_client object', () => {
	// 		let config = generateConfig()
	// 		let snap = new Snap(config)
	// 		let param = generateParamMin()
	// 		let customUrl = 'https://mysite.com/midtrans-notification-handler'

	// 		snap.httpClient.http_client.interceptors.request.use(
	// 			function (config) {
	// 				// Do something before request is sent
	// 				expect(config.headers.common['X-Override-Notification']).toStrictEqual(customUrl)
	// 				return config
	// 			},
	// 			function (error) {
	// 				// Do something with request error
	// 				return Promise.reject(error)
	// 			}
	// 		)

	// 		snap.httpClient.http_client.defaults.headers.common['X-Override-Notification'] = customUrl
	// 		snap.createTransactionToken().catch((e) => {
	// 			expect(snap.httpClient.http_client.defaults).toHaveProperty('headers')
	// 			expect(typeof snap.httpClient.http_client.defaults.headers.common).toStrictEqual('object')
	// 			expect(snap.httpClient.http_client.defaults.headers.common['X-Override-Notification']).toStrictEqual(customUrl)
	// 		})
	// 	})
})

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

function generateParamMin() {
	return {
		transaction_details: {
			order_id: 'node-midtransclient-test-' + generateTimestamp(),
			gross_amount: 200000
		},
		credit_card: {
			secure: true
		}
	}
}

function generateParamMax() {
	return {
		transaction_details: {
			order_id: 'node-midtransclient-test-' + generateTimestamp(),
			gross_amount: 10000
		},
		item_details: [
			{
				id: 'ITEM1',
				price: 10000,
				quantity: 1,
				name: 'Midtrans Bear',
				brand: 'Midtrans',
				category: 'Toys',
				merchant_name: 'Midtrans'
			}
		],
		customer_details: {
			first_name: 'John',
			last_name: 'Watson',
			email: 'test@example.com',
			phone: '+628123456',
			billing_address: {
				first_name: 'John',
				last_name: 'Watson',
				email: 'test@example.com',
				phone: '081 2233 44-55',
				address: 'Sudirman',
				city: 'Jakarta',
				postal_code: '12190',
				country_code: 'IDN'
			},
			shipping_address: {
				first_name: 'John',
				last_name: 'Watson',
				email: 'test@example.com',
				phone: '0 8128-75 7-9338',
				address: 'Sudirman',
				city: 'Jakarta',
				postal_code: '12190',
				country_code: 'IDN'
			}
		},
		enabled_payments: [
			'credit_card',
			'mandiri_clickpay',
			'cimb_clicks',
			'bca_klikbca',
			'bca_klikpay',
			'bri_epay',
			'echannel',
			'indosat_dompetku',
			'mandiri_ecash',
			'permata_va',
			'bca_va',
			'bni_va',
			'other_va',
			'gopay',
			'kioson',
			'indomaret',
			'gci',
			'danamon_online'
		],
		credit_card: {
			secure: true,
			channel: 'migs',
			bank: 'bca',
			installment: {
				required: false,
				terms: {
					bni: [3, 6, 12],
					mandiri: [3, 6, 12],
					cimb: [3],
					bca: [3, 6, 12],
					offline: [6, 12]
				}
			},
			whitelist_bins: ['48111111', '41111111']
		},
		bca_va: {
			va_number: '12345678911',
			free_text: {
				inquiry: [
					{
						en: 'text in English',
						id: 'text in Bahasa Indonesia'
					}
				],
				payment: [
					{
						en: 'text in English',
						id: 'text in Bahasa Indonesia'
					}
				]
			}
		},
		bni_va: {
			va_number: '12345678'
		},
		permata_va: {
			va_number: '1234567890',
			recipient_name: 'SUDARSONO'
		},
		callbacks: {
			finish: 'https://demo.midtrans.com'
		},
		expiry: {
			start_time: new Date().getFullYear() + 1 + '-12-20 18:11:08 +0700',
			unit: 'minutes',
			duration: 1
		},
		custom_field1: 'custom field 1 content',
		custom_field2: 'custom field 2 content',
		custom_field3: 'custom field 3 content'
	}
}
