const 	chai 		= require('chai'),
		instanceOf 	= chai.assert.instanceOf,
		method 		= 'copy',
		{dynamic} 	= require('../_values.js'),
		{input} 	= dynamic;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid A1 object:', () =>
		{
			it(
				`${input} copy is an instance of A1`,
				() => instanceOf(new A1(input)[method](), A1)
			);
		});
	});
}
