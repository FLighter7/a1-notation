import {assert} from 'chai';
import {a1Valid, a1Invalid} from '../_values.js';

const {doesNotThrow, throws} = assert;
const method = 'range';

export default (A1) => {
	describe(`constructor(${method})`, () =>
	{
		describe('Constructor was created without errors:', () =>
		{
			a1Valid.forEach(({value}) =>
			{
				it(value, () => doesNotThrow( () => new A1(value) ));
			});
		});
		describe('An error should be shown:', () =>
		{
			a1Invalid.forEach(({text, value, expectedError}) =>
			{
				it(text, () => throws(() => new A1(value), Error, expectedError));
			});
		});
	});
}
