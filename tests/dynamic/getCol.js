const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'getCol',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			colStart,
		} 	= dynamic;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${input} the first column is ${colStart}`,
				() => equal(new A1(input)[method](), colStart)
			);
		});
	});
}