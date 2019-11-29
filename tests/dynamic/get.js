const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'get',
		{dynamic} 	= require('../_values.js'),
		{input} 	= dynamic;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid string:', () =>
		{
			it(
				`${input} range is ${input}`,
				() => equal(new A1(input)[method](), input)
			);
		});
	});
}