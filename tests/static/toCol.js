import {assert} from 'chai';
import {intPositiveValid, intPositiveInvalid} from '../_values.js';

const {strictEqual, throws} = assert;
const equal 	= strictEqual,
		method 	= 'toCol';

export default (A1) =>
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
