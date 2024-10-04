import {assert} from 'chai';
import {a1Valid, a1Invalid} from '../_values.js';

/**
 *	rangeStart, rangeEnd
 *	col, row
 */
const {doesNotThrow, throws} = assert;
const method 			= 'rangeStart, rangeEnd',
		hasColon = v => v.includes(':'),
		isNumber = v => typeof v === 'number' && v > 0 && Number.isInteger(v);

export default (A1) => {
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
