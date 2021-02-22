const 	chai 		= require('chai'),
		equal 		= chai.assert.deepEqual,
		method 		= 'shift',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			colStart,
			rowStart,
			colEnd,
			rowEnd,
		} 	= dynamic,
		shift = 1;

module.exports = (A1) =>
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
