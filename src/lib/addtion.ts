export const addition = (x: number, y: number): number | any => {
	if (typeof x === 'number' && typeof y === 'number') {
		return x + y
	}
	return new TypeError('parameter must be number')
}
