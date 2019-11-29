// Module
const A1 	= require('../dist/object/index.umd.js');

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

tests.static.isValid(A1);
tests.static.getCol(A1);
tests.static.getLastCol(A1);
tests.static.toCol(A1);
tests.static.getRow(A1);
tests.static.getLastRow(A1);
tests.static.toRow(A1);
tests.static.getWidth(A1);
tests.static.getHeight(A1);

tests.constructor.range(A1);
tests.constructor.twoArguments(A1);
tests.constructor.colRowNRows(A1);
tests.constructor.colRowNRowsNCols(A1);
tests.constructor.object(A1);

tests.dynamic.get(A1);
tests.dynamic.toString(A1);
tests.dynamic.toJSON(A1);
tests.dynamic.getCol(A1);
tests.dynamic.getLastCol(A1);
tests.dynamic.getRow(A1);
tests.dynamic.getLastRow(A1);
tests.dynamic.getWidth(A1);
tests.dynamic.getHeight(A1);
tests.dynamic.copy(A1);
tests.dynamic.addX(A1);
tests.dynamic.addY(A1);
tests.dynamic.add(A1);
tests.dynamic.removeX(A1);
tests.dynamic.removeY(A1);
tests.dynamic.remove(A1);
tests.dynamic.shiftX(A1);
tests.dynamic.shiftY(A1);
tests.dynamic.shift(A1);