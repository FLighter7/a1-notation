const 	chai 		= require('chai'),
		equal 		= chai.assert.deepEqual,
		method 		= 'toJSON',
		{dynamic} 	= require('../_values.js'),
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

module.exports = (A1) =>
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