"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidtransClient = void 0;
const coreApi_1 = require("./lib/coreApi");
const snap_1 = require("./lib/snap");
const iris_1 = require("./lib/iris");
var MidtransClient;
(function (MidtransClient) {
    class CoreApi extends coreApi_1.CoreApi {
    }
    MidtransClient.CoreApi = CoreApi;
    class Snap extends snap_1.Snap {
    }
    MidtransClient.Snap = Snap;
    class Iris extends iris_1.Iris {
    }
    MidtransClient.Iris = Iris;
})(MidtransClient = exports.MidtransClient || (exports.MidtransClient = {}));
