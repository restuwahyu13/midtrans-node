export interface ApiConfigOptions {
	readonly isProduction: boolean
	readonly serverKey: string
	readonly clientKey: string
}

export class APIConfig {
	readonly isProduction: boolean
	readonly serverKey: string
	readonly clientKey: string
}
