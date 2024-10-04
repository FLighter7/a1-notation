import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {deepEqual} = assert;
const equal 		= deepEqual,
		method 		= 'shift',
		{
			input,
			colStart,
			rowStart,
			colEnd,
			rowEnd,
		} 	= dynamic,
		shift = 1;

export default (A1) =>
{
	describe(`new A1('${input}').${method}(${shift}, ${shift}) // Positive tests only`, () =>
	{
		let text =
		[
			`colStart: ${colStart + shift}`,
			`rowStart: ${rowStart + shift}`,
			`colEnd: ${colEnd + shift}`,
			`rowEnd: ${rowEnd + shift}`,
		];
		it(
			`Must be valid numbers: (${text.join(', ')})`,
			() =>
			{
				let a1 = new A1(input)[method](shift, shift);
				equal(
					{
						colStart: 	a1.getCol(),
						rowStart: 	a1.getRow(),
						colEnd: 	a1.getLastCol(),
						rowEnd: 	a1.getLastRow(),
					},
					{
						colStart: 	colStart + shift,
						rowStart: 	rowStart + shift,
						colEnd: 	colEnd 	 + shift,
						rowEnd: 	rowEnd 	 + shift,
					}
				);
			}
		);
	});
}
