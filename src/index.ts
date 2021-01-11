import { CoreApi as CoreAPI } from './lib/coreApi'

declare namespace midtransClient {
	export class CoreApi extends CoreAPI {}
}

export default midtransClient
