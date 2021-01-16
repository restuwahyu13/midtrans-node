import { MidtransClient } from '../src/index'

const keys = {
	serverKey: 'SB-Mid-server-GwUP_WGbJPXsDzsNEBRs8IYA',
	clientKey: 'SB-Mid-client-61XuGAwQ8Bj8LxSS'
}

const core = new MidtransClient.CoreApi({
	isProduction: false,
	...keys
})

// core.apiConfig.set({
// 	isProduction: false,
// 	serverKey: 'SB-Mid-server-t8ogovcI7eenIMvjFkJnlu6Q',
// 	clientKey: 'SB-Mid-client-HtqoZuHbSrnVRgrE'
// })

core.transaction
	.deny('BL-1610641734954')
	.then((res) => console.log(res))
	.catch((err) => console.log(err))

// core
// 	.charge({
// 		chargeBankTransfer: {
// 			payment_type: 'bank_transfer',
// 			bank_transfer: {
// 				bank: 'bri'
// 			},
// 			item_details: [
// 				{
// 					name: 'nissan skyline GTR',
// 					quantity: 1,
// 					price: 30000000000
// 				}
// 			],
// 			transaction_details: {
// 				order_id: `BL-${Date.now()}`,
// 				gross_amount: 30000000000
// 			},
// 			customer_details: {
// 				first_name: 'hasan',
// 				last_name: 'dwi',
// 				email: 'hasan13@zetmail.com',
// 				phone: '0887855985',
// 				billing_address: {
// 					address: 'Jl.sultan iskandar, block m',
// 					city: 'jakarta',
// 					postal_code: '146653'
// 				}
// 			}
// 		}
// 	})
// 	.then((res) => {
// 		console.log(res)
// 	})
// 	.catch((err) => {
// 		console.log(err)
// 	})
