const 	chai 	= require('chai'),
		equal 	= chai.assert.strictEqual,
		throws 	= chai.assert.throws,
		method 	= 'toCol',
		{
			intPositiveValid,
			intPositiveInvalid,
		} = require('../_values.js');

module.exports = (A1) =>
{
	describe(`.${method}()`, () =>
	{
		describe('Must be a valid string:', () =>
		{
			intPositiveValid.forEach(({value, a1Col}) =>
			{
				it(
					`${value} column is ${a1Col}`,
					() => equal(A1[method](value), a1Col)
				);
			});
		});
		describe('An error should be shown:', () =>
		{
			intPositiveInvalid.forEach(({text, value, expectedError}) =>
			{
				it(text, () => throws(A1[method].bind(A1, value), Error, expectedError));
			});
		});
	});
}