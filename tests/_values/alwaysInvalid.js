/**
 *	Always invalid
 */
const alwaysInvalid =
[
	{
		text: 			'undefined',
		value: 			undefined,
		expectedError: 	/^Invalid A1 .+: undefined$/,
	},
	{
		text: 			'null',
		value: 			null,
		expectedError: 	/^Invalid A1 .+: null$/,
	},
	{
		text: 			'NaN',
		value: 			NaN,
		expectedError: 	/^Invalid A1 .+: .+$/,
	},
	{
		text: 			'() => {}',
		value: 			() => {},
		expectedError: 	/^Invalid A1 .+: undefined$/,
	},
	{
		text: 			'class A{}',
		value: 			class A{},
		expectedError: 	/^Invalid A1 .+: undefined$/,
	},
	{
		text: 			'[]',
		value: 			[],
		expectedError: 	/^Invalid A1 .+: \[\]$/,
	},
	{
		text: 			'{}',
		value: 			{},
		expectedError: 	/^Invalid A1 .+: \{\}$/,
	},
	{
		text: 			'true',
		value: 			true,
		expectedError: 	/^Invalid A1 .+: true$/,
	},
	// Boundary values
	{
		text: 			'""',
		value: 			'',
		expectedError: 	/^Invalid A1 .+: ""$/,
	},
	{
		text: 			'1.24',
		value: 			1.24,
		expectedError: 	/^Invalid A1 .+: .+$/,
	},
	{
		text: 			'A',
		value: 			'A',
		expectedError: 	/^Invalid A1 .+: ".+"$/,
	},
	{
		text: 			'aa',
		value: 			'aa',
		expectedError: 	/^Invalid A1 .+: ".+"$/,
	},
	{
		text: 			'string',
		value: 			'string',
		expectedError: 	/^Invalid A1 .+: ".+"$/,
	},
	{
		text: 			'List!A1',
		value: 			'List!A1',
		expectedError: 	/^Invalid A1 .+: ".+"$/,
	},
	{
		text: 			'$A1',
		value: 			'$A1',
		expectedError: 	/^Invalid A1 .+: ".+"$/,
	},
	{
		text: 			'A$1',
		value: 			'A$1',
		expectedError: 	/^Invalid A1 .+: ".+"$/,
	},
	{
		text: 			'$A$1',
		value: 			'$A$1',
		expectedError: 	/^Invalid A1 .+: ".+"$/,
	},
];

module.exports = alwaysInvalid;