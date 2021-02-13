import { isType } from 'is-any-type'
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
		expect(isType(iris.apiConfig.get().serverKey)).toStrictEqual('string')
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
		const spyIris = jest.spyOn(iris, 'ping')
		const res = await iris.ping()
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(isType(res)).toStrictEqual('string')
		expect(res).toStrictEqual('pong')
		done()
	})

	it('fail 400 to createBeneficiaries with unset api key', (done) => {
		const spyIris = jest.spyOn(iris, 'createBeneficiaries')
		return iris.createBeneficiaries({}).catch((e) => {
			expect(spyIris).toHaveBeenCalled()
			expect(spyIris).toHaveBeenCalledTimes(1)
			expect(e.message).toMatch(/400/)
			done()
		})
	})

	it('fail to createBeneficiaries: account duplicated / already been taken', () => {
		const spyIris = jest.spyOn(iris, 'createBeneficiaries')
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
				expect(spyIris).toHaveBeenCalled()
				expect(spyIris).toHaveBeenCalledTimes(1)
			})
			.catch((e) => {
				expect(e.message).toMatch(/400/)
			})
	})

	it('able to updateBeneficiaries with existing/created account', async (done) => {
		const spyIris = jest.spyOn(iris, 'updateBeneficiaries')
		const res = await iris.updateBeneficiaries('budisusantoo', {
			name: 'Budi Susantoo',
			account: '0611101141',
			bank: 'bca',
			alias_name: 'budisusantoo',
			email: 'budi.susantoo@example.com'
		})
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(res).toHaveProperty('status')
		expect(res.status).toStrictEqual('updated')
		done()
	})

	it('able to getBeneficiaries', async (done) => {
		const spyIris = jest.spyOn(iris, 'getBeneficiaries')
		const res = await iris.getBeneficiaries()
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(res).toBeInstanceOf(Array)
		expect(res[0]).toHaveProperty('alias_name')
		expect(res[0]).toHaveProperty('account')
		done()
	})

	it('able to createPayouts', async (done) => {
		const spyIris = jest.spyOn(iris, 'createPayouts')
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
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(res).toHaveProperty('payouts')
		expect(res.payouts).toBeInstanceOf(Array)
		expect(res.payouts[0]).toHaveProperty('reference_no')
		expect(isType(res.payouts[0].reference_no)).toStrictEqual('string')
		globVar.createdRefNo = res.payouts[0].reference_no
		done()
	})

	it('fail to approvePayouts: role not authorized', () => {
		const spyIris = jest.spyOn(iris, 'approvePayouts')
		return iris
			.approvePayouts({
				reference_nos: ['123123123'],
				otp: '335163'
			})
			.catch((e) => {
				expect(spyIris).toHaveBeenCalled()
				expect(spyIris).toHaveBeenCalledTimes(1)
				expect(e.message).toMatch(/401/)
			})
	})

	it('able to rejectPayouts that has been created above', async (done) => {
		const spyIris = jest.spyOn(iris, 'rejectPayouts')
		const res = await iris.rejectPayouts({
			reference_nos: [globVar.createdRefNo],
			reject_reason: 'Reason to reject payouts'
		})
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(res).toHaveProperty('status')
		expect(isType(res.status)).toStrictEqual('string')
		done()
	})

	it('able to getPayoutDetails that has been rejected above', async (done) => {
		const spyIris = jest.spyOn(iris, 'getPayoutDetails')
		const res = await iris.getPayoutDetails(globVar.createdRefNo)
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(res).toHaveProperty('status')
		expect(isType(res.status)).toStrictEqual('string')
		expect(res.status).toStrictEqual('rejected')
		globVar.createdRefNo = res.reference_no
		done()
	})

	it('able to getBalance', async (done) => {
		const spyIris = jest.spyOn(iris, 'getBalance')
		const res = await iris.getBalance()
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(isType(res.balance)).toStrictEqual('string')
		done()
	})

	it('able to getTransactionHistory', async (done) => {
		const spyIris = jest.spyOn(iris, 'getTransactionHistory')
		const res = await iris.getTransactionHistory()
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(res).toBeInstanceOf(Array)
		if (res.length > 0) {
			expect(isType(res[0].status)).toStrictEqual('string')
			expect(isType(res[0].reference_no)).toStrictEqual('string')
			expect(isType(res[0].beneficiary_account)).toStrictEqual('string')
			done()
		}
		done()
	})

	it('able to getTopupChannels', async (done) => {
		const spyIris = jest.spyOn(iris, 'getTopupChannels')
		const res = await iris.getTopupChannels()
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(res).toBeInstanceOf(Array)
		expect(isType(res[0].id)).toStrictEqual('number')
		expect(isType(res[0].virtual_account_type)).toStrictEqual('string')
		expect(isType(res[0].virtual_account_number)).toStrictEqual('string')
		done()
	})

	it('fail to getFacilitatorBalance not authorized due to non facilitator account', () => {
		const spyIris = jest.spyOn(iris, 'getFacilitatorBalance')
		return iris.getFacilitatorBalance().catch((e) => {
			expect(spyIris).toHaveBeenCalled()
			expect(spyIris).toHaveBeenCalledTimes(1)
			expect(e.message).toMatch(/401/)
		})
	})

	it('able to getFacilitatorBankAccounts not authorized due to non facilitator account', () => {
		const spyIris = jest.spyOn(iris, 'getFacilitatorBankAccounts')
		return iris.getFacilitatorBankAccounts().catch((e) => {
			expect(spyIris).toHaveBeenCalled()
			expect(spyIris).toHaveBeenCalledTimes(1)
			expect(e.message).toMatch(/401/)
		})
	})

	it('able to getBeneficiaryBanks', async (done) => {
		const spyIris = jest.spyOn(iris, 'getBeneficiaryBanks')
		const res = await iris.getBeneficiaryBanks()
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(res.beneficiary_banks).toBeInstanceOf(Array)
		expect(isType(res.beneficiary_banks[0].code)).toStrictEqual('string')
		expect(isType(res.beneficiary_banks[0].name)).toStrictEqual('string')
		done()
	})

	it('able to validateBankAccount', async (done) => {
		const spyIris = jest.spyOn(iris, 'validateBankAccount')
		const res = await iris.validateBankAccount({ bank: 'danamon', account: '000001137298' })
		expect(spyIris).toHaveBeenCalled()
		expect(spyIris).toHaveBeenCalledTimes(1)
		expect(isType(res.account_no)).toStrictEqual('string')
		expect(isType(res.account_name)).toStrictEqual('string')
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
