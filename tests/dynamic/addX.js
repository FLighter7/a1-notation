const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'addX',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			width,
		} 	= dynamic,
		add = 1;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}(${add}) // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${width} + ${add} = ${width + add}`,
				() => equal(new A1(input)[method](add).getWidth(), width + add)
			);
		});
	});
}