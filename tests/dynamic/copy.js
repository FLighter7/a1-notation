import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {instanceOf} = assert;
const method 		= 'copy',
		{input} 	= dynamic;

export default (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid A1 object:', () =>
		{
			it(
				`${input} copy is an instance of A1`,
				() => instanceOf(new A1(input)[method](), A1)
			);
		});
	});
}
