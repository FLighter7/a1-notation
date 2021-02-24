// Module
const A1 	= require('../dist/index.umd.js');

// Tests
const tests =
{
	static:
	{
		isValid: 	require('./static/isValid.js'),
		getCol: 	require('./static/getCol.js'),
		getLastCol: require('./static/getLastCol.js'),
		toCol: 		require('./static/toCol.js'),
		getRow: 	require('./static/getRow.js'),
		getLastRow: require('./static/getLastRow.js'),
		toRow: 		require('./static/toRow.js'),
		getWidth: 	require('./static/getWidth.js'),
		getHeight: 	require('./static/getHeight.js'),
	},
	constructor:
	{
		object: 			require('./constructor/object.js'),
		range: 				require('./constructor/range.js'),
		twoArguments: 		require('./constructor/two-arguments.js'),
		colRowNRows: 		require('./constructor/col-row-nRows.js'),
		colRowNRowsNCols: 	require('./constructor/col-row-nRows-nCols.js'),
	},
	dynamic:
	{
		get: 		require('./dynamic/get.js'),
		toString: 	require('./dynamic/toString.js'),
		toJSON: 	require('./dynamic/toJSON.js'),
		getCol: 	require('./dynamic/getCol.js'),
		getLastCol: require('./dynamic/getLastCol.js'),
		getRow: 	require('./dynamic/getRow.js'),
		getLastRow: require('./dynamic/getLastRow.js'),
		getWidth: 	require('./dynamic/getWidth.js'),
		getHeight: 	require('./dynamic/getHeight.js'),
		copy: 		require('./dynamic/copy.js'),
		addX: 		require('./dynamic/addX.js'),
		addY: 		require('./dynamic/addY.js'),
		add: 		require('./dynamic/add.js'),
		removeX: 	require('./dynamic/removeX.js'),
		removeY: 	require('./dynamic/removeY.js'),
		remove: 	require('./dynamic/remove.js'),
		shiftX: 	require('./dynamic/shiftX.js'),
		shiftY: 	require('./dynamic/shiftY.js'),
		shift: 		require('./dynamic/shift.js'),
	},
};

// Run them
for(const scope in tests)
  for(const method in tests[scope])
    tests[scope][method](A1);
