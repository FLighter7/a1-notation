const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'getLastRow',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			rowEnd,
		} 	= dynamic;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${input} the last row is ${rowEnd}`,
				() => equal(new A1(input)[method](), rowEnd)
			);
		});
	});
}