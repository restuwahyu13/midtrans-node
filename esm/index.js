import { CoreApi as MidtransCoreApi } from './lib/coreApi';
import { Snap as MidtransSnap } from './lib/snap';
import { Iris as MidtransIris } from './lib/iris';
export var MidtransClient;
(function (MidtransClient) {
    class CoreApi extends MidtransCoreApi {
    }
    MidtransClient.CoreApi = CoreApi;
    class Snap extends MidtransSnap {
    }
    MidtransClient.Snap = Snap;
    class Iris extends MidtransIris {
    }
    MidtransClient.Iris = Iris;
})(MidtransClient || (MidtransClient = {}));
