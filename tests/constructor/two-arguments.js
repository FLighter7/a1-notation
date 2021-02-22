/**
 *	rangeStart, rangeEnd
 *	col, row
 */
const 	chai 			= require('chai'),
		doesNotThrow 	= chai.assert.doesNotThrow,
		throws 			= chai.assert.throws,
		method 			= 'rangeStart, rangeEnd',
		{
			a1Valid,
			a1Invalid,
		} = require('../_values.js'),
		hasColon = v => v.includes(':'),
		isNumber = v => typeof v === 'number' && v > 0 && Number.isInteger(v);

module.exports = (A1) =>
{
	describe(`constructor(${method})\n  constructor(col, row)`, () =>
	{
		a1Valid.forEach(({value, expectedError}) =>
		{
			if(hasColon(value))
				it(
					`An error should be shown: ${value}`,
					() => throws(() => new A1(value, value), Error, expectedError)
				);
			else
				it(
					`Constructor was created without errors: ${value}`,
					() => doesNotThrow( () => new A1(value, value) )
				);
		});
		a1Invalid.forEach(({text, value, expectedError}) =>
		{
			if(isNumber(value))
				it(
					`Constructor was created without errors: ${value}`,
					() => doesNotThrow( () => new A1(value, value) )
				);
			else
				it(
					`An error should be shown: ${text}`,
					() => throws(() => new A1(value, value), Error, expectedError)
				);
		});
	});
}
