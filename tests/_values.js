const 	alwaysInvalid 		= require('./_values/alwaysInvalid.js'),
		alwaysA1Valid 		= require('./_values/alwaysA1Valid.js'),
		intPositiveNumbers 	= require('./_values/intPositiveNumbers.js'),
		intOtherNumbers 	= require('./_values/intOtherNumbers.js');

const o =
{
	// Input must be "string"
	a1Valid: 			alwaysA1Valid,
	a1Invalid: 			[...alwaysInvalid, ...intPositiveNumbers, ...intOtherNumbers],
	// Input must be "number" > 0
	intPositiveValid: 	intPositiveNumbers,
	intPositiveInvalid: [...alwaysInvalid, ...intOtherNumbers, ...alwaysA1Valid],
	// Input must be "number"
	intAllValid: 		[...intPositiveNumbers, ...intOtherNumbers],
	intAllInvalid: 		[...alwaysInvalid, ...alwaysA1Valid],
	// For "dynamic" tests
	dynamic:
	{
		input: 		'A3:B4',
		colStart: 	1,
		rowStart: 	3,
		colEnd: 	2,
		rowEnd: 	4,
		width: 		2,
		height: 	2,
	},
};

module.exports = o;
