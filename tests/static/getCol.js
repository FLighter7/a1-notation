const 	chai 	= require('chai'),
		equal 	= chai.assert.strictEqual,
		throws 	= chai.assert.throws,
		method 	= 'getCol',
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
			a1Valid.forEach(({value, startCol}) =>
			{
				it(
					`${value} the first column is ${startCol}`,
					() => equal(A1[method](value), startCol)
				);
				it(
					`${value} the first column is ${startCol} (converter 2)`,
					() => equal(A1[method](value, 2), startCol)
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
