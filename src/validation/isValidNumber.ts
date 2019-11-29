/**
 *	@fileOverview Checks number validation
 *	@param {T} n
 *	@param {boolean} [strict = true]
 *
 *	@return {boolean}
 */
export default function<T>(n: T, strict: boolean = true): boolean
{
	let isNumber = typeof n === 'number' && Number.isInteger(n);
	return strict ? (isNumber && +n > 0) : isNumber;
}