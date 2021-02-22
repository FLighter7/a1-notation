const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'shiftY',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			rowStart,
		} 	= dynamic,
		shift = 1;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}(${shift}) // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${rowStart} ${method} ${shift} = ${rowStart + shift}`,
				() => equal(new A1(input)[method](shift).getRow(), rowStart + shift)
			);
		});
	});
}
