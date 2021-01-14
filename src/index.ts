import { CoreApi as MidtransCoreApi } from './lib/coreApi'

declare namespace midtransClient {
	class CoreApi extends MidtransCoreApi {}
}

export = midtransClient
