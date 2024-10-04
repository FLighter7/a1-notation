import {assert} from 'chai';
import {a1Valid, a1Invalid} from '../_values.js';

const {strictEqual, throws} = assert;
const equal 	= strictEqual,
		method 	= 'getHeight';

export default (A1) =>
{
	describe(`.${method}()`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			a1Valid.forEach(({value, startRow, endRow}) =>
			{
				let expected = endRow - startRow + 1;
				it(
					`${value} height is ${expected}`,
					() => equal(A1[method](value), expected)
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
