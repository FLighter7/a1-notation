const 	chai 	= require('chai'),
		equal 	= chai.assert.strictEqual,
		throws 	= chai.assert.throws,
		method 	= 'getLastCol',
		{
			a1Valid,
			a1Invalid,
		} = require('../_values.js');

module.exports = (A1) =>
{
	describe(`.${method}()`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			a1Valid.forEach(({value, endCol}) =>
			{
				it(
					`${value} the last column is ${endCol}`,
					() => equal(A1[method](value), endCol)
				);
				it(
					`${value} the last column is ${endCol} (converter 2)`,
					() => equal(A1[method](value, 2), endCol)
				);
			});
		});
		describe('An error should be shown:', () =>
		{
			a1Invalid.forEach(({text, value, expectedError}) =>
			{
				it(text, () => throws(A1[method].bind(A1, value), Error, expectedError));
			});
		});
	});
}
