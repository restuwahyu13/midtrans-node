import { CoreApi as MidtransCoreApi } from './lib/coreApi'
import { Snap as MidtransSnap } from './lib/snap'
import { Iris as MidtransIris } from './lib/iris'

declare namespace midtransClient {
	export class CoreApi extends MidtransCoreApi {}
	export class Snap extends MidtransSnap {}
	export class Iris extends MidtransIris {}
}

export default midtransClient
