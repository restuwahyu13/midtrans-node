import { isType } from '../src/utils/util.is'
import { Snap } from '../src/lib/snap'
import { config } from '../config'

describe('Snap', () => {
	let snap

	beforeEach(() => {
		snap = new Snap(generateConfig())
		jest.resetAllMocks()
	})

	afterAll(() => {
		jest.clearAllMocks()
	})

	it('class should be working', () => {
		expect(snap instanceof Snap).toBeTruthy()
		expect(snap.createTransaction).toBeInstanceOf(Function)
		expect(snap.createTransactionToken).toBeInstanceOf(Function)
		expect(snap.createTransactionRedirectUrl).toBeInstanceOf(Function)
		expect(snap.apiConfig.get().serverKey).toStrictEqual(config.serverKey)
		expect(snap.apiConfig.get().clientKey).toStrictEqual(config.clientKey)
	})

	it('able to create transaction simple param', async (done) => {
		const spySnap = jest.spyOn(snap, 'createTransaction')
		const res = await snap.createTransaction(generateParamMin())
		expect(spySnap).toHaveBeenCalled()
		expect(spySnap).toHaveBeenCalledTimes(1)
		expect(res).toHaveProperty('token')
		expect(isType(res.token)).toStrictEqual('string')
		expect(res).toHaveProperty('redirect_url')
		expect(isType(res.token)).toStrictEqual('string')
		done()
	})

	it('able to create transaction max param', async (done) => {
		const spySnap = jest.spyOn(snap, 'createTransaction')
		const res = await snap.createTransaction(generateParamMax())
		expect(spySnap).toHaveBeenCalled()
		expect(spySnap).toHaveBeenCalledTimes(1)
		expect(res).toHaveProperty('token')
		expect(isType(res.token)).toStrictEqual('string')
		expect(res).toHaveProperty('redirect_url')
		expect(isType(res.token)).toStrictEqual('string')
		done()
	})

	it('able to create transaction token', async (done) => {
		const spySnap = jest.spyOn(snap, 'createTransactionToken')
		const token = await snap.createTransactionToken(generateParamMin())
		expect(spySnap).toHaveBeenCalled()
		expect(spySnap).toHaveBeenCalledTimes(1)
		expect(isType(token)).toStrictEqual('string')
		done()
	})

	it('able to create transaction redirect_url', async (done) => {
		const spySnap = jest.spyOn(snap, 'createTransactionRedirectUrl')
		const redirect_url = await snap.createTransactionRedirectUrl(generateParamMin())
		expect(spySnap).toHaveBeenCalled()
		expect(spySnap).toHaveBeenCalledTimes(1)
		expect(isType(redirect_url)).toStrictEqual('string')
		done()
	})

	it('fail to status transaction 404 with non exists order_id', (done) => {
		const spySnap = jest.spyOn(snap.transaction, 'status')
		snap.transaction.status('non exists order_id').catch((e) => {
			expect(spySnap).toHaveBeenCalled()
			expect(spySnap).toHaveBeenCalledTimes(1)
			expect(e.message).toMatch(/404/)
			done()
		})
	})

	it('able to re-set serverKey via setter', () => {
		snap.apiConfig.set({ serverKey: '', clientKey: 'abc' })
		expect(snap.apiConfig.get().serverKey).toStrictEqual('')
		snap.apiConfig.set({ serverKey: config.serverKey })
		expect(snap.apiConfig.get().isProduction).toBeFalsy()
		expect(snap.apiConfig.get().serverKey).toStrictEqual(config.serverKey)
		expect(snap.apiConfig.get().clientKey).toStrictEqual('abc')
	})

	it('able to re-set serverKey via property', () => {
		snap.apiConfig.serverKey = ''
		snap.apiConfig.clientKey = 'abc'
		expect(snap.apiConfig.get().serverKey).toStrictEqual('')
		snap.apiConfig.serverKey = config.serverKey
		expect(snap.apiConfig.get().isProduction).toBeFalsy()
		expect(snap.apiConfig.get().serverKey).toStrictEqual(config.serverKey)
		expect(snap.apiConfig.get().clientKey).toStrictEqual('abc')
	})

	it('fail to create transaction 401 with no serverKey', (done) => {
		const spySnap = jest.spyOn(snap, 'createTransaction')
		snap.apiConfig.set({ serverKey: '' })
		return snap.createTransaction(generateParamMin()).catch((e) => {
			expect(spySnap).toHaveBeenCalled()
			expect(spySnap).toHaveBeenCalledTimes(1)
			expect(e.message).toMatch(/401/)
			done()
		})
	})

	it('fail to create transaction 400 with no param', (done) => {
		const spySnap = jest.spyOn(snap, 'createTransaction')
		snap.createTransaction().catch((e) => {
			expect(spySnap).toHaveBeenCalled()
			expect(spySnap).toHaveBeenCalledTimes(1)
			expect(e.message).toMatch(/400/)
			done()
		})
	})

	it('fail to create transaction with zero gross_amount', (done) => {
		const spySnap = jest.spyOn(snap, 'createTransaction')
		const param = generateParamMin()
		param.transaction_details.gross_amount = 0
		snap.createTransaction().catch((e) => {
			expect(spySnap).toHaveBeenCalled()
			expect(spySnap).toHaveBeenCalledTimes(1)
			expect(e.message).toMatch(/400/)
			done()
		})
	})

	it('able to set X-Override-Notification request header via exposed http_client object', (done) => {
		let customUrl = 'https://mysite.com/midtrans-notification-handler'
		snap.httpClient.httpClient.interceptors.request.use(
			(config) => {
				// Do something before request is sent
				expect(config.headers.common['X-Override-Notification']).toStrictEqual(customUrl)
				return config
			},
			// Do something with request error
			(error) => Promise.reject(error)
		)
		snap.httpClient.httpClient.defaults.headers.common['X-Override-Notification'] = customUrl
		snap.createTransactionToken().catch(() => {
			expect(snap.httpClient.httpClient.defaults).toHaveProperty('headers')
			expect(isType(snap.httpClient.httpClient.defaults.headers.common)).toStrictEqual('object')
			expect(snap.httpClient.httpClient.defaults.headers.common['X-Override-Notification']).toStrictEqual(customUrl)
			done()
		})
	})
})

// Helper Function

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
