const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'getHeight',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			height,
		} 	= dynamic;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${input} height is ${height}`,
				() => equal(new A1(input)[method](), height)
			);
		});
	});
}
