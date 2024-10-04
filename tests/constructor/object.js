import {assert} from 'chai';
import {validObjects} from '../_values.js';

const {doesNotThrow} = assert;
const method = 'options';

export default (A1) => {
	describe(`constructor(${method}) // Positive tests only`, () =>
	{
		describe('Constructor was created without errors:', () =>
		{
			validObjects.forEach(o =>
			{
				it(
					JSON.stringify(o),
					() => doesNotThrow( () => new A1(o) )
				);
			});
		});
	});
}
