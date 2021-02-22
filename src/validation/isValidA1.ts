/**
 *	@fileOverview Checks validation
 *	@param {string} a1
 *
 *	@return {boolean}
 */
export default function(a1: string): boolean
{
	return /^[A-Z]+\d+(:[A-Z]+\d+)?$/i.test(a1);
}
