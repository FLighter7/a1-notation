const 	chai 	= require('chai'),
		equal 	= chai.assert.strictEqual,
		throws 	= chai.assert.throws,
		method 	= 'toRow',
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
			intPositiveValid.forEach(({value, a1Row}) =>
			{
				it(
					`${value} row is ${a1Row}`,
					() => equal(A1[method](value), a1Row)
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