import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {strictEqual} = assert;
const equal 		= strictEqual,
		method 		= 'shiftX',
		{
			input,
			colStart,
		} 	= dynamic,
		shift = 1;

export default (A1) =>
{
	describe(`new A1('${input}').${method}(${shift}) // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${colStart} ${method} ${shift} = ${colStart + shift}`,
				() => equal(new A1(input)[method](shift).getCol(), colStart + shift)
			);
		});
	});
}
