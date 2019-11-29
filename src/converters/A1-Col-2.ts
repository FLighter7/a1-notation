/**
 *	@fileOverview Converts column letter to number
 *	@author Flambino
 *	@see https://codereview.stackexchange.com/questions/90112/a1notation-conversion-to-row-column-index
 *	@param {string} col
 *
 *	@return {number}
 */
export default function(col: string): number
{
	let i,
		l,
		chr,
		sum 	= 0,
		A 		= 'A'.charCodeAt(0),
		radix 	= 'Z'.charCodeAt(0) - A + 1;
	for(i = 0, l = col.length; i < l; i++)
	{
		chr = col.charCodeAt(i);
		sum = sum * radix + chr - A + 1;
	}
	return sum;
}