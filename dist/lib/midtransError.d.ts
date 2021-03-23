import { MidtransErrorOptions } from '../types/midtransError';
/**
 * Custom HTTP Error Class that also expose httpStatusCode, ApiResponse, rawHttpClientData
 * To expose more info for lib user
 */
export declare class MidtransError extends Error {
    readonly name: string;
    constructor(options: MidtransErrorOptions | Record<string, any>);
}
