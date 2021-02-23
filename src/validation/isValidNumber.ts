/**
 *	@fileOverview Checks number validation
 *	@param {T} n
 *	@param {boolean} [positiveOnly = true]
 *
 *	@return {boolean}
 */
export default function<T>(n: T, positiveOnly: boolean = true): boolean
{
	const isNumber = typeof n === 'number' && Number.isInteger(n);
	return positiveOnly ? (isNumber && +n > 0) : isNumber;
}
