/**
 *	@fileOverview Converts column letter to number
 *	@author AdamL
 *	@see https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
 *	@param {string} col
 *
 *	@return {number}
 */
export default function(col: string): number
{
	let column = 0,
		length = col.length;
	for(let i = 0; i < length; i++)
		column += (col.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
	return column;
}
