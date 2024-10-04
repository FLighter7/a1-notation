import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {strictEqual} = assert;
const equal 		= strictEqual,
		method 		= 'getLastCol',
		{
			input,
			colEnd,
		} 	= dynamic;

export default (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${input} the last column is ${colEnd}`,
				() => equal(new A1(input)[method](), colEnd)
			);
		});
	});
}
