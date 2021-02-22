const 	chai 			= require('chai'),
		doesNotThrow 	= chai.assert.doesNotThrow,
		method 			= 'options',
		validObjects 	= require('../_values/validObjects.js');

module.exports = (A1) =>
{
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
