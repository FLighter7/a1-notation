import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {strictEqual} = assert;
const equal 		= strictEqual,
		method 		= 'toString',
		{input} 	= dynamic;

export default (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid string:', () =>
		{
			it(
				`${input} range is ${input}`,
				() => equal(new A1(input)[method](), input)
			);
		});
	});
}
