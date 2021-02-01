import { isType } from 'is-any-type'
import { HttpClient } from '../src/lib/httpClient'
import { config } from '../config'
describe('HttpClient', () => {
	let httpClient

	beforeEach(() => {
		httpClient = new HttpClient()
		jest.resetAllMocks()
	})

	afterAll(() => {
		jest.clearAllMocks()
	})

	it('class should be working', () => {
		expect(httpClient instanceof HttpClient).toBeTruthy()
	})

	it('have .request function', () => {
		expect(isType(httpClient.request)).toStrictEqual('function')
	})

	it('able to raw request to snap api', async (done) => {
		const spyHttpClient = jest.spyOn(httpClient, 'request')
		const res = await httpClient.request({
			requestUrl: config.SNAP_SANDBOX_BASE_URL + '/transactions',
			httpMethod: 'post',
			serverKey: config.serverKey,
			requestPayload: generateParamMin()
		})
		expect(spyHttpClient).toHaveBeenCalled()
		expect(spyHttpClient).toHaveBeenCalledTimes(1)
		expect(res).toHaveProperty('token')
		expect(isType(res.token)).toStrictEqual('string')
		done()
	})

	it('able to raw request GET Token to Core Api', async (done) => {
		const spyHttpClient = jest.spyOn(httpClient, 'request')
		const res = await httpClient.request({
			requestUrl: config.CORE_SANDBOX_BASE_URL + '/token',
			httpMethod: 'get',
			serverKey: config.serverKey,
			requestPayload: {
				card_number: '5264 2210 3887 4659',
				card_exp_month: '12',
				card_exp_year: `${new Date().getFullYear() + 1}`,
				card_cvv: '123',
				client_key: config.clientKey
			}
		})
		expect(spyHttpClient).toHaveBeenCalled()
		expect(spyHttpClient).toHaveBeenCalledTimes(1)
		expect(res).toHaveProperty('token_id')
		expect(isType(res.token_id)).toStrictEqual('string')
		done()
	})

	it('able to throw fail to parse string as json exception', () => {
		const spyHttpClient = jest.spyOn(httpClient, 'request')
		return httpClient
			.request({
				requestUrl: config.SNAP_SANDBOX_BASE_URL + '/transactions',
				httpMethod: 'post',
				serverKey: config.serverKey,
				requestPayload: 'not json'
			})
			.then(() => {
				expect(spyHttpClient).toHaveBeenCalled()
				expect(spyHttpClient).toHaveBeenCalledTimes(1)
			})
			.catch((e) => expect(e.message).toBe('request is must be a object you give type string'))
	})
})

// helper function

function generateParamMin() {
	return {
		transaction_details: {
			order_id: 'node-midtransclient-test-' + Math.round(new Date().getTime() / 1),
			gross_amount: 200000
		},
		credit_card: {
			secure: true
		}
	}
}
