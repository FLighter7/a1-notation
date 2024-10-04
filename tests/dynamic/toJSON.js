import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {deepEqual} = assert;
const equal 		= deepEqual,
		method 		= 'toJSON',
		{input} 	= dynamic,
		output 		=
		{
			colStart: 	dynamic.colStart,
			rowStart: 	dynamic.rowStart,
			colEnd: 	dynamic.colEnd,
			rowEnd: 	dynamic.rowEnd,
			a1: 		dynamic.input,
			rowsCount: 	dynamic.height,
			colsCount: 	dynamic.width,
		};

export default (A1) =>
{
	describe(`new A1('${input}').${method}() // Positive tests only`, () =>
	{
		describe('Must be a valid JSON:', () =>
		{
			it(
				`${input} JSON is ${JSON.stringify(output)}`,
				() => equal(new A1(input)[method](), output)
			);
		});
	});
}
