const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'getLastCol',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			colEnd,
		} 	= dynamic;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${input} the last column is ${colEnd}`,
				() => equal(new A1(input)[method](), colEnd)
			);
		});
	});
}