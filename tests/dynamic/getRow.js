const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'getRow',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			rowStart,
		} 	= dynamic;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${input} the first row is ${rowStart}`,
				() => equal(new A1(input)[method](), rowStart)
			);
		});
	});
}
