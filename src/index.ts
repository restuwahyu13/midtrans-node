import { CoreApi as MidtransCoreApi } from './lib/coreApi'

declare namespace midtransClient {
	export class CoreApi extends MidtransCoreApi {}
}

export default midtransClient
