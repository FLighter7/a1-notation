/**
 *	@fileOverview Converts column number to letter
 *	@author AdamL
 *	@see https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
 *	@param {number} col
 *
 *	@return {string}
 */
export default function(col: number): string
{
	let letter = '',
		temp;
	while(col > 0)
	{
		temp 	= (col - 1) % 26;
		letter 	= String.fromCharCode(temp + 65) + letter;
		col 	= (col - temp - 1) / 26;
	}
	return letter;
}