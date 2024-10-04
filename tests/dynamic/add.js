import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {deepEqual} = assert;
const equal 		= deepEqual,
		method 		= 'add',
		{
			input,
			width,
			height,
		} 	= dynamic,
		add = 1;

export default (A1) => {
	describe(`new A1('${input}').${method}(${add}, ${add}) // Positive tests only`, () =>
	{
		it(
			`Must be valid numbers: (width: ${width + add}, height: ${height + add})`,
			() =>
			{
				let a1 = new A1(input)[method](add, add);
				equal(
					{
						width: 	a1.getWidth(),
						height: a1.getHeight(),
					},
					{
						width: 	width 	+ add,
						height: height 	+ add,
					}
				);
			}
		);
	});
}
