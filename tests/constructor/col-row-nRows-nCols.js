import {assert} from 'chai';
import {a1Valid, a1Invalid} from '../_values.js';

const {doesNotThrow, throws} = assert;
const method 			= 'col, row, nRows, nCols',
		hasColon = v => v.includes(':'),
		isNumber = v => typeof v === 'number' && v > 0 && Number.isInteger(v);

export default (A1) => {
	describe(`constructor(${method})`, () =>
	{
		a1Valid.forEach(({value, expectedError}) =>
		{
			if(hasColon(value))
				it(
					`An error should be shown: ${value}`,
					() => throws(() => new A1(value, value, value, value), Error, expectedError)
				);
			else
				it(
					`Constructor was created without errors: ${value}`,
					() => doesNotThrow( () => new A1(value, value, value, value) )
				);
		});
		a1Invalid.forEach(({text, value, expectedError}) =>
		{
			if(isNumber(value))
				it(
					`Constructor was created without errors: ${value}`,
					() => doesNotThrow( () => new A1(value, value, value, value) )
				);
			else
				it(
					`An error should be shown: ${text}`,
					() => throws(() => new A1(value, value, value, value), Error, expectedError)
				);
		});
	});
}
