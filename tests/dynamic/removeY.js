const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'removeY',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			height,
		} 	= dynamic,
		remove = 1;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}(${remove}) // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${height} - ${remove} = ${height - remove}`,
				() => equal(new A1(input)[method](remove).getHeight(), height - remove)
			);
		});
	});
}