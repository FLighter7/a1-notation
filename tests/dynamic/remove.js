import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {deepEqual} = assert;
const equal 		= deepEqual,
		method 		= 'remove',
		{
			input,
			width,
			height,
		} 	= dynamic,
		remove = 1;

export default (A1) =>
{
	describe(`new A1('${input}').${method}(${remove}, ${remove}) // Positive tests only`, () =>
	{
		it(
			`Must be valid numbers: (width: ${width - remove}, height: ${height - remove})`,
			() =>
			{
				let a1 = new A1(input)[method](remove, remove);
				equal(
					{
						width: 	a1.getWidth(),
						height: a1.getHeight(),
					},
					{
						width: 	width 	- remove,
						height: height 	- remove,
					}
				);
			}
		);
	});
}
