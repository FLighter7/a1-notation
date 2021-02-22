const 	chai 		= require('chai'),
		equal 		= chai.assert.deepEqual,
		method 		= 'add',
		{dynamic} 	= require('../_values.js'),
		{
			input,
			width,
			height,
		} 	= dynamic,
		add = 1;

module.exports = (A1) =>
{
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
