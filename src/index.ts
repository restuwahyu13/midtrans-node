import { CoreApi as MidtransCoreApi } from './lib/coreApi'
import { Snap as MidtransSnap } from './lib/snap'
import { Iris as MidtransIris } from './lib/iris'

export namespace MidtransClient {
	export class CoreApi extends MidtransCoreApi {}
	export class Snap extends MidtransSnap {}
	export class Iris extends MidtransIris {}
}