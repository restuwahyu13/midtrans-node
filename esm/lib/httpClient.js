import axios from 'axios';
import { isType } from 'is-any-type';
import { MidtransError } from './midtransError';
/**
 * Wrapper of Axios to do API request to Midtrans API
 * @return {Promise} of API response, or exception during request
 * capable to do HTTP `request`
 */
export class HttpClient {
    constructor(options = {}) {
        this.parent = options;
        this.httpClient = axios.create();
        this.headers = {
            'content-type': 'application/json',
            'accept': 'application/json',
            'user-agent': 'midtransclient-nodejs/1.2.3'
        };
        this.requestBody = {};
        this.requestParam = {};
    }
    request(options) {
        const headers = this.headers;
        let requestBody = this.requestBody;
        let requestParam = this.requestParam;
        if (options.httpMethod.toLowerCase() === 'get') {
            // GET http request will use first available param as URL Query param
            requestParam = options.requestPayload;
        }
        else {
            // Non GET http request will use first available param as JSON payload body
            requestBody = options.requestPayload;
        }
        return new Promise(async (resolve, reject) => {
            if (isType(requestBody) === 'string' || isType(requestParam) === 'string') {
                // Reject if body is not JSON
                try {
                    requestBody = JSON.parse(requestBody);
                    requestParam = JSON.parse(requestParam);
                }
                catch (err) {
                    reject(new MidtransError({ message: `request is must be a object you give type ${isType(requestBody)}` }));
                }
            }
            // Fetching data from server
            try {
                const res = await axios({
                    method: options.httpMethod,
                    headers: headers,
                    url: options.requestUrl,
                    data: requestBody,
                    params: requestParam,
                    auth: { username: options.serverKey, password: '' }
                });
                // Reject core API error status code
                if (res.data.hasOwnProperty('status_code') && res.data.status_code >= 400 && res.data.status_code != 407) {
                    // 407 is expected get-status API response for `expire` transaction, non-standard
                    reject(new MidtransError({
                        message: `${res.data.status_message} HTTP status code ${res.data.status_code}`
                    }));
                }
                // Result Axios Response To Client
                resolve(res.data);
            }
            catch (err) {
                let res = err.response;
                if (isType(res) !== 'undefined' && res.status >= 400) {
                    // Reject API error HTTP status code
                    reject(new MidtransError({ message: err.message }));
                }
                // Throw Error Response
                reject(res);
            }
        });
    }
}
