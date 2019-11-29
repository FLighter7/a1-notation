const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'shiftX',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			colStart,
		} 	= dynamic,
		shift = 1;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}(${shift}) // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${colStart} ${method} ${shift} = ${colStart + shift}`,
				() => equal(new A1(input)[method](shift).getCol(), colStart + shift)
			);
		});
	});
}