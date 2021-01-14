import { MidtransClient } from './index'

const snap = new MidtransClient.Snap({
	isProduction: false,
	serverKey: 'SB-Mid-server-t8ogovcI7eenIMvjFkJnlu6Q',
	clientKey: 'SB-Mid-client-HtqoZuHbSrnVRgrE'
})

snap.transaction
	.status('BL-1610608975121')
	.then((res) => console.log(res))
	.catch((err) => console.log(err))
