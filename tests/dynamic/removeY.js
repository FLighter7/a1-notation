import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {strictEqual} = assert;
const equal 		= strictEqual,
		method 		= 'removeY',
		{
			input,
			height,
		} 	= dynamic,
		remove = 1;

export default (A1) =>
{
	describe(`new A1('${input}').${method}(${remove}) // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${height} - ${remove} = ${height - remove}`,
				() => equal(new A1(input)[method](remove).getHeight(), height - remove)
			);
		});
	});
}
