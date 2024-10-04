import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {strictEqual} = assert;
const equal 		= strictEqual,
		method 		= 'addY',
		{
			input,
			height,
		} 	= dynamic,
		add = 1;

export default (A1) =>
{
	describe(`new A1('${input}').${method}(${add}) // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${height} + ${add} = ${height + add}`,
				() => equal(new A1(input)[method](add).getHeight(), height + add)
			);
		});
	});
}
