import {assert} from 'chai';
import {a1Valid, a1Invalid} from '../_values.js';

const {isOk, isNotOk} = assert;
const method 	= 'isValid';

export default (A1) =>
{
	describe(`.${method}()`, () =>
	{
		describe('Must be valid:', () =>
		{
			a1Valid.forEach(({value}) =>
			{
				it(value, () => isOk(A1[method](value)));
			});
		});
		describe('Must be invalid:', () =>
		{
			a1Invalid.forEach(({text, value}) =>
			{
				it(text, () => isNotOk(A1[method](value)));
			});
		});
	});
}
