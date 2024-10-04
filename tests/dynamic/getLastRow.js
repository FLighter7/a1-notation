import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {strictEqual} = assert;
const equal 		= strictEqual,
		method 		= 'getLastRow',
		{
			input,
			rowEnd,
		} 	= dynamic;

export default (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${input} the last row is ${rowEnd}`,
				() => equal(new A1(input)[method](), rowEnd)
			);
		});
	});
}
