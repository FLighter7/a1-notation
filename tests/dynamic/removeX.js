import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {strictEqual} = assert;
const equal 		= strictEqual,
		method 		= 'removeX',
		{
			input,
			width,
		} 	= dynamic,
		remove = 1;

export default (A1) =>
{
	describe(`new A1('${input}').${method}(${remove}) // Positive tests only`, () =>
	{
		describe('Must be a valid number:', () =>
		{
			it(
				`${width} - ${remove} = ${width - remove}`,
				() => equal(new A1(input)[method](remove).getWidth(), width - remove)
			);
		});
	});
}
