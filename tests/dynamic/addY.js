const 	chai 		= require('chai'),
		equal 		= chai.assert.strictEqual,
		method 		= 'addY',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			height,
		} 	= dynamic,
		add = 1;

module.exports = (A1) =>
{
	describe(`new A1('${input}').${method}(${add}) // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${height} + ${add} = ${height + add}`,
				() => equal(new A1(input)[method](add).getHeight(), height + add)
			);
		});
	});
}
