export interface ApiConfigOptions {
    readonly isProduction: boolean;
    readonly serverKey: string;
    readonly clientKey: string;
}
export interface ApiConfigGetter {
    readonly isProduction: boolean;
    readonly serverKey: string;
    readonly clientKey: string;
}
