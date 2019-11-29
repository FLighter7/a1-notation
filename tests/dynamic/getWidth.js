const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'getWidth',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			width,
		} 	= dynamic;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${input} width is ${width}`,
				() => equal(new A1(input)[method](), width)
			);
		});
	});
}