const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'removeX',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			width,
		} 	= dynamic,
		remove = 1;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}(${remove}) // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${width} - ${remove} = ${width - remove}`,
				() => equal(new A1(input)[method](remove).getWidth(), width - remove)
			);
		});
	});
}
