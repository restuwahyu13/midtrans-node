type HttpClientSubOptionsConfig = {
	readonly isProduction?: boolean
	readonly serverKey?: string
	readonly clientKey?: string
}

export interface HttpClientOptions {
	readonly url: string
	readonly method: string
	readonly configs?: HttpClientSubOptionsConfig
	readonly parameter?: any
}
