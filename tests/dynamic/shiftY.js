import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {strictEqual} = assert;
const equal 		= strictEqual,
		method 		= 'shiftY',
		{
			input,
			rowStart,
		} 	= dynamic,
		shift = 1;

export default (A1) =>
{
	describe(`new A1('${input}').${method}(${shift}) // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${rowStart} ${method} ${shift} = ${rowStart + shift}`,
				() => equal(new A1(input)[method](shift).getRow(), rowStart + shift)
			);
		});
	});
}
