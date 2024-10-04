import {assert} from 'chai';
import {a1Valid, a1Invalid} from '../_values.js';

const {strictEqual, throws} = assert;
const equal 	= strictEqual,
		method 	= 'getLastRow';

export default (A1) =>
{
	describe(`.${method}()`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			a1Valid.forEach(({value, endRow}) =>
			{
				it(
					`${value} the last row is ${endRow}`,
					() => equal(A1[method](value), endRow)
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
