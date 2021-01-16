import { Iris } from '../src/lib/iris'
import { config } from '../config'
let globVar = {
	createdRefNo: ''
}

describe('Iris.js', () => {
	let iris

	beforeEach(() => {
		iris = new Iris(generateConfig())
		jest.resetAllMocks()
	})

	afterAll(() => {
		jest.clearAllMocks()
	})

	it('class should be working', () => {
		expect(iris instanceof Iris).toBeTruthy()
		expect(iris.ping).toBeInstanceOf(Function)
		expect(iris.createBeneficiaries).toBeInstanceOf(Function)
		expect(iris.updateBeneficiaries).toBeInstanceOf(Function)
		expect(iris.getBeneficiaries).toBeInstanceOf(Function)
		expect(iris.createPayouts).toBeInstanceOf(Function)
		expect(iris.approvePayouts).toBeInstanceOf(Function)
		expect(iris.rejectPayouts).toBeInstanceOf(Function)
		expect(iris.getPayoutDetails).toBeInstanceOf(Function)
		expect(iris.getTransactionHistory).toBeInstanceOf(Function)
		expect(iris.getTopupChannels).toBeInstanceOf(Function)
		expect(iris.getBalance).toBeInstanceOf(Function)
		expect(iris.getFacilitatorBankAccounts).toBeInstanceOf(Function)
		expect(iris.getFacilitatorBalance).toBeInstanceOf(Function)
		expect(iris.getBeneficiaryBanks).toBeInstanceOf(Function)
		expect(iris.validateBankAccount).toBeInstanceOf(Function)
		expect(typeof iris.apiConfig.get().serverKey).toStrictEqual('string')
	})

	it('able to re-set serverKey via setter', () => {
		const spyIris = jest.spyOn(iris.apiConfig, 'set')
		iris.apiConfig.set({ serverKey: '' })
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(iris.apiConfig.get().isProduction).toBeFalsy()
		expect(iris.apiConfig.get().serverKey).toStrictEqual('')
		iris.apiConfig.set({ serverKey: config.irisApiKey })
		expect(iris.apiConfig.get().serverKey).toStrictEqual(config.irisApiKey)
	})

	it('able to re-set serverKey via property', () => {
		const spyIris = jest.spyOn(iris.apiConfig, 'get')
		iris.apiConfig.get()
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(iris.apiConfig.get().isProduction).toBeFalsy()
		iris.apiConfig.serverKey = ''
		expect(iris.apiConfig.get().serverKey).toStrictEqual('')
		iris.apiConfig.serverKey = config.irisApiKey
		expect(iris.apiConfig.get().serverKey).toStrictEqual(config.irisApiKey)
	})

	it('able to ping with correct api key', async (done) => {
		const res = await iris.ping()
		expect(typeof res).toStrictEqual('string')
		expect(res).toStrictEqual('pong')
		done()
	})

	it('fail 401 to createBeneficiaries with unset api key', () => {
		return iris
			.createBeneficiaries({})
			.then((res) => expect(res).toStrictEqual(null))
			.catch((e) => expect(e.httpStatusCode).toStrictEqual(400))
	})

	it('fail to createBeneficiaries: account duplicated / already been taken', () => {
		return iris
			.createBeneficiaries({
				name: 'Budi Susantoo',
				account: '0611101146',
				bank: 'bca',
				alias_name: 'budisusantoo',
				email: 'budi.susantoo@example.com'
			})
			.then((res) => {
				expect(res).toStrictEqual(null)
			})
			.catch((e) => {
				expect(e.httpStatusCode).toStrictEqual(400)
				expect(e.message).toMatch(/400/)
				expect(e.message).toMatch(/error occurred when creating beneficiary/)
				expect(e.ApiResponse.errors[0]).toMatch(/already been taken/)
			})
	})

	it('able to updateBeneficiaries with existing/created account', async (done) => {
		const res = await iris.updateBeneficiaries('budisusantoo', {
			name: 'Budi Susantoo',
			account: '0611101141',
			bank: 'bca',
			alias_name: 'budisusantoo',
			email: 'budi.susantoo@example.com'
		})
		expect(res).toHaveProperty('status')
		expect(res.status).toStrictEqual('updated')
		done()
	})

	it('able to getBeneficiaries', async (done) => {
		const res = await iris.getBeneficiaries()
		expect(res).toBeInstanceOf(Array)
		expect(res[0]).toHaveProperty('alias_name')
		expect(res[0]).toHaveProperty('account')
		done()
	})

	it('able to createPayouts', async (done) => {
		const res = await iris.createPayouts({
			payouts: [
				{
					beneficiary_name: 'Budi Susantoo',
					beneficiary_account: '0611101146',
					beneficiary_bank: 'bca',
					beneficiary_email: 'budi.susantoo@example.com',
					amount: '10233',
					notes: 'unit test node js'
				}
			]
		})
		expect(res).toHaveProperty('payouts')
		expect(res.payouts).toBeInstanceOf(Array)
		expect(res.payouts[0]).toHaveProperty('reference_no')
		expect(typeof res.payouts[0].reference_no).toStrictEqual('string')
		globVar.createdRefNo = res.payouts[0].reference_no
		done()
	})

	it('fail to approvePayouts: role not authorized', () => {
		return iris
			.approvePayouts({
				reference_nos: ['123123123'],
				otp: '335163'
			})
			.catch((e) => {
				expect(e.message).toMatch(/401/)
				expect(e.message).toMatch(/not authorized/)
			})
	})

	it('able to rejectPayouts that has been created above', async (done) => {
		const res = await iris.rejectPayouts({
			reference_nos: [globVar.createdRefNo],
			reject_reason: 'Reason to reject payouts'
		})
		expect(res).toHaveProperty('status')
		expect(typeof res.status).toStrictEqual('string')
		done()
	})

	it('able to getPayoutDetails that has been rejected above', async (done) => {
		const res = await iris.getPayoutDetails(globVar.createdRefNo)
		expect(res).toHaveProperty('status')
		expect(typeof res.status).toStrictEqual('string')
		expect(res.status).toStrictEqual('rejected')
		done()
	})

	it('able to getTransactionHistory', async (done) => {
		const res = await iris.getTransactionHistory()
		console.log(res)
		expect(res).toBeInstanceOf(Array)
		expect(typeof res[0].status).toStrictEqual('string')
		expect(typeof res[0].reference_no).toStrictEqual('string')
		expect(typeof res[0].beneficiary_account).toStrictEqual('string')
		done()
	})

	it('able to getTopupChannels', async (done) => {
		const res = await iris.getTopupChannels()
		expect(res).toBeInstanceOf(Array)
		expect(typeof res[0].id).toStrictEqual('number')
		expect(typeof res[0].virtual_account_type).toStrictEqual('string')
		expect(typeof res[0].virtual_account_number).toStrictEqual('string')
		done()
	})

	it('able to getBalance', () => {
		return iris.getBalance().then((res) => expect(typeof res.balance).toStrictEqual('string'))
	})

	it('fail to getFacilitatorBankAccounts: not authorized due to non facilitator account', () => {
		return iris.getFacilitatorBalance().catch((e) => expect(e.message).toMatch(/not authorized/))
	})

	it('fail to getFacilitatorBalance: not authorized due to non facilitator account', () => {
		return iris.getFacilitatorBalance().catch((e) => expect(e.message).toMatch(/not authorized/))
	})

	it('able to getBeneficiaryBanks', async (done) => {
		const res = await iris.getBeneficiaryBanks()
		expect(res.beneficiary_banks).toBeInstanceOf(Array)
		expect(typeof res.beneficiary_banks[0].code).toStrictEqual('string')
		expect(typeof res.beneficiary_banks[0].name).toStrictEqual('string')
		done()
	})

	it('able to validateBankAccount', async (done) => {
		const res = await iris.validateBankAccount({
			bank: 'danamon',
			account: '000001137298'
		})
		expect(typeof res.account_no).toStrictEqual('string')
		expect(typeof res.account_name).toStrictEqual('string')
		done()
	})
})

/**
 * Helper functions
 */
function generateConfig() {
	return {
		isProduction: false,
		serverKey: config.irisApiKey
	}
}
