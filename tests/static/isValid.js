const 	chai 	= require('chai'),
		isOk 	= chai.assert.isOk,
		isNotOk = chai.assert.isNotOk,
		method 	= 'isValid',
		{
			a1Valid,
			a1Invalid,
		} = require('../_values.js');

module.exports = (A1) =>
{
	describe(`.${method}()`, () =>
	{
		describe('Must be valid:', () =>
		{
			a1Valid.forEach(({value}) =>
			{
				it(value, () => isOk(A1[method](value)));
			});
		});
		describe('Must be invalid:', () =>
		{
			a1Invalid.forEach(({text, value}) =>
			{
				it(text, () => isNotOk(A1[method](value)));
			});
		});
	});
}
