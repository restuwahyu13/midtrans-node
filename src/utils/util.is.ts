export const isType = (data: any): string => {
	const isArray: string = Array.isArray(data) && 'array'
	const isObject: string = data === {} && 'object'
	const isNull: string = data == null && 'null'

	const isGrouping: string = isArray || isObject || isNull
	const isCheck: string = !isGrouping ? typeof data : isGrouping

	const isTypeData: string[] = [
		'number',
		'string',
		'array',
		'symbol',
		'object',
		'undefined',
		'null',
		'function',
		'boolean'
	]
	const isMatch: number = isTypeData.indexOf(isCheck)
	const isResult: string = isTypeData[isMatch]

	return isResult
}
