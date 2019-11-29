const 	chai 			= require('chai'),
		doesNotThrow 	= chai.assert.doesNotThrow,
		throws 			= chai.assert.throws,
		method 			= 'range',
		{
			a1Valid,
			a1Invalid,
		} = require('../_values.js');

module.exports = (A1) =>
{
	describe(`constructor(${method})`, () =>
	{
		describe('Constructor was created without errors:', () =>
		{
			a1Valid.forEach(({value}) =>
			{
				it(value, () => doesNotThrow( () => new A1(value) ));
			});
		});
		describe('An error should be shown:', () =>
		{
			a1Invalid.forEach(({text, value, expectedError}) =>
			{
				it(text, () => throws(() => new A1(value), Error, expectedError));
			});
		});
	});
}