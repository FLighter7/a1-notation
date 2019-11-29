(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.A1 = factory());
}(this, (function () { 'use strict';

	/**
	 *	@fileOverview Converts column letter to number
	 *	@author AdamL
	 *	@see https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
	 *	@param {string} col
	 *
	 *	@return {number}
	 */
	function A1Col1 (col) {
	    let column = 0, length = col.length;
	    for (let i = 0; i < length; i++)
	        column += (col.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
	    return column;
	}

	/**
	 *	@fileOverview Converts column letter to number
	 *	@author Flambino
	 *	@see https://codereview.stackexchange.com/questions/90112/a1notation-conversion-to-row-column-index
	 *	@param {string} col
	 *
	 *	@return {number}
	 */
	function A1Col2 (col) {
	    let i, l, chr, sum = 0, A = 'A'.charCodeAt(0), radix = 'Z'.charCodeAt(0) - A + 1;
	    for (i = 0, l = col.length; i < l; i++) {
	        chr = col.charCodeAt(i);
	        sum = sum * radix + chr - A + 1;
	    }
	    return sum;
	}

	/**
	 *	@fileOverview Converts row string to number
	 *	@param {string} row
	 *
	 *	@return {number}
	 */
	function A1Row (row) {
	    return parseInt(row, 10);
	}

	/**
	 *	@fileOverview Converts column number to letter
	 *	@author AdamL
	 *	@see https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
	 *	@param {number} col
	 *
	 *	@return {string}
	 */
	function ColA1 (col) {
	    let letter = '', temp;
	    while (col > 0) {
	        temp = (col - 1) % 26;
	        letter = String.fromCharCode(temp + 65) + letter;
	        col = (col - temp - 1) / 26;
	    }
	    return letter;
	}

	/**
	 *	@fileOverview Converts row number to string
	 *	@param {number} row
	 *
	 *	@return {string}
	 */
	function RowA1 (row) {
	    return row.toString();
	}

	/**
	 *	@fileOverview Checks validation
	 *	@param {string} a1
	 *
	 *	@return {boolean}
	 */
	function isValidA1 (a1) {
	    return /^[A-Z]+\d+(:[A-Z]+\d+)?$/i.test(a1);
	}

	/**
	 *	@fileOverview Checks number validation
	 *	@param {T} n
	 *	@param {boolean} [strict = true]
	 *
	 *	@return {boolean}
	 */
	function isValidNumber (n, strict = true) {
	    let isNumber = typeof n === 'number' && Number.isInteger(n);
	    return strict ? (isNumber && +n > 0) : isNumber;
	}

	/**
	 *	@fileOverview A1 notation errors
	 */
	class A1Error extends Error {
	    constructor(something) {
	        let str = JSON.stringify(something);
	        super(str);
	        this.name = 'A1Error';
	        this.message = str;
	    }
	    wasString() {
	        this.message = `Invalid A1 notation: ${this.message}`;
	        return this;
	    }
	    wasNumber() {
	        this.message = `Invalid A1 number(s): ${this.message}`;
	        return this;
	    }
	    wasUnknown() {
	        this.message = `Invalid A1 argument(s): ${this.message}`;
	        return this;
	    }
	}

	/**
	 *	@fileOverview Math operations and converting in A1 notation
	 *	Supports A1 notation like "A1" and "A1:B2"
	 *	@author FLighter
	 */
	class A1 {
	    constructor(something, something2, nRows, nCols) {
	        /**
	         *	Example: A1:B2
	         */
	        this._colStart = 0; // A -> 1
	        this._rowStart = 0; // 1 -> 1
	        this._colEnd = 0; // B -> 2
	        this._rowEnd = 0; // 2 -> 2
	        this._converter = 1; // converter 1 | 2
	        // No arguments
	        if (!arguments.length)
	            throw new A1Error().wasUnknown();
	        let type = typeof something;
	        // Object
	        if (something && type === 'object')
	            this._initObject.apply(this, arguments);
	        // Number
	        else if (type === 'number')
	            this._initNumber.apply(this, arguments);
	        // String
	        else if (type === 'string')
	            this._initString.apply(this, arguments);
	        // Unknown argument
	        else
	            throw new A1Error(something).wasUnknown();
	    }
	    /**
	     *	Parses A1 notation
	     *	@param {string} a1
	     *	@param {1 | 2}  converter
	     *
	     *	@return {object} {cs: number, rs: number, ce: number, re: number}
	     */
	    static _parse(a1, converter) {
	        let [, cs, // col start // A
	        rs, // row start // 1
	        ce, // col end 	// B
	        re,] = a1.toUpperCase().match(this._reg);
	        ce = ce || cs;
	        re = re || rs;
	        let colStart = this._A1Col(cs, converter), colEnd = this._A1Col(ce, converter), rowStart = A1Row(rs), rowEnd = A1Row(re);
	        // For non-standard A1
	        return {
	            cs: colEnd > colStart ? colStart : colEnd,
	            rs: rowEnd > rowStart ? rowStart : rowEnd,
	            ce: colEnd > colStart ? colEnd : colStart,
	            re: rowEnd > rowStart ? rowEnd : rowStart,
	        };
	    }
	    /**
	     *	Converts column letter to number using converter 1 or 2
	     *	@param {string} a1
	     *	@param {1 | 2} converter
	     *
	     *	@return {number}
	     */
	    static _A1Col(a1, converter) {
	        return converter === 1 ? A1Col1(a1) : A1Col2(a1);
	    }
	    /******************
	     *	STATIC METHODS
	     ******************/
	    /**
	     *	Checks A1 notation
	     *	@param {string} a1
	     *
	     *	@return {boolean}
	     */
	    static isValid(a1) {
	        return isValidA1(a1);
	    }
	    /**
	     *	Converts the first column letter from A1 to number
	     *	@param {string} a1
	     *	@param {1 | 2} [converter = 1]
	     *
	     *	@return {number}
	     */
	    static getCol(a1, converter = 1) {
	        if (!isValidA1(a1))
	            throw new A1Error(a1).wasString();
	        return this._parse(a1, converter).cs;
	    }
	    /**
	     *	Converts the last column letter from A1 to number
	     *	@param {string} a1
	     *	@param {1 | 2} [converter = 1]
	     *
	     *	@return {number}
	     */
	    static getLastCol(a1, converter = 1) {
	        if (!isValidA1(a1))
	            throw new A1Error(a1).wasString();
	        return this._parse(a1, converter).ce;
	    }
	    /**
	     *	Converts number to column letter in A1
	     *	@param {number} col
	     *
	     *	@return {string}
	     */
	    static toCol(col) {
	        if (!isValidNumber(col))
	            throw new A1Error(col).wasNumber();
	        return ColA1(col);
	    }
	    /**
	     *	Converts the first row string to number
	     *	@param {string} a1
	     *
	     *	@return {number}
	     */
	    static getRow(a1) {
	        if (!isValidA1(a1))
	            throw new A1Error(a1).wasString();
	        return this._parse(a1, 1).rs;
	    }
	    /**
	     *	Converts the last row string to number
	     *	@param {string} a1
	     *
	     *	@return {number}
	     */
	    static getLastRow(a1) {
	        if (!isValidA1(a1))
	            throw new A1Error(a1).wasString();
	        return this._parse(a1, 1).re;
	    }
	    /**
	     *	Converts number to row string in A1
	     *	@param {number} row
	     *
	     *	@return {string}
	     */
	    static toRow(row) {
	        if (!isValidNumber(row))
	            throw new A1Error(row).wasNumber();
	        return RowA1(row);
	    }
	    /**
	     *	@param {string} a1
	     *	@param {1 | 2} [converter = 1]
	     *
	     *	@return {number} columns count
	     */
	    static getWidth(a1, converter = 1) {
	        if (!isValidA1(a1))
	            throw new A1Error(a1).wasString();
	        let { ce, cs } = this._parse(a1, converter);
	        return ce - cs + 1;
	    }
	    /**
	     *	@param {string} a1
	     *
	     *	@return {number} rows count
	     */
	    static getHeight(a1) {
	        if (!isValidA1(a1))
	            throw new A1Error(a1).wasString();
	        let { re, rs } = this._parse(a1, 1);
	        return re - rs + 1;
	    }
	    /***************
	     *	CONSTRUCTOR
	     ***************/
	    /**
	     *	It handles case:
	     *	constructor(object: options)
	     *	@param {options[]} args
	     */
	    _initObject(...args) {
	        const isString = (some) => typeof some === 'string', areEmpty = (all, excludingKeys) => {
	            !Array.isArray(excludingKeys) && (excludingKeys = [excludingKeys]);
	            for (let key in all)
	                if (!excludingKeys.includes(key) && all[key].val)
	                    return false;
	            return true;
	        };
	        let options = args[0], { converter } = options;
	        if (converter && ![1, 2].includes(converter))
	            throw new A1Error({ converter }).wasUnknown();
	        this._converter = converter || 1;
	        // Create object with types
	        let all = {};
	        ['colStart', 'rowStart', 'colEnd', 'rowEnd', 'a1Start', 'a1End', 'nCols', 'nRows'].forEach(key => {
	            let val = options[key];
	            all[key] =
	                {
	                    isString: isString(val),
	                    isNumber: isValidNumber(val),
	                    val,
	                };
	        });
	        let { colStart, rowStart, colEnd, rowEnd, a1Start, a1End, nCols, nRows } = all;
	        /**
	         *	Executing by priority
	         */
	        switch (true) {
	            /**
	             *	a1Start
	             */
	            case (a1Start.isString && areEmpty(all, 'a1Start')):
	                return this._initString(a1Start.val);
	            /**
	             *	a1Start, a1End
	             */
	            case (a1Start.isString && a1End.isString && areEmpty(all, ['a1Start', 'a1End'])):
	                return this._initString(a1Start.val, a1End.val);
	            /**
	             *	colStart, rowStart (string, string)
	             */
	            case (colStart.isString && rowStart.isString && areEmpty(all, ['colStart', 'rowStart'])):
	                return this._initString(colStart.val + rowStart.val);
	            /**
	             *	colStart, rowStart (number, number)
	             */
	            case (colStart.isNumber && rowStart.isNumber && areEmpty(all, ['colStart', 'rowStart'])):
	                return this._initNumber(colStart.val, rowStart.val);
	            /**
	             *	colStart, rowStart, nRows (number, number, number)
	             */
	            case (colStart.isNumber && rowStart.isNumber && nRows.isNumber && areEmpty(all, ['colStart', 'rowStart', 'nRows'])):
	                return this._initNumber(colStart.val, rowStart.val, nRows.val);
	            /**
	             *	colStart, rowStart, nCols (number, number, number)
	             */
	            case (colStart.isNumber && rowStart.isNumber && nCols.isNumber && areEmpty(all, ['colStart', 'rowStart', 'nCols'])):
	                return this._initNumber(colStart.val, rowStart.val, 1, nCols.val);
	            /**
	             *	colStart, rowStart, nRows, nCols (number, number, number, number)
	             */
	            case (colStart.isNumber && rowStart.isNumber && nRows.isNumber && nCols.isNumber && areEmpty(all, ['colStart', 'rowStart', 'nRows', 'nCols'])):
	                return this._initNumber(colStart.val, rowStart.val, nRows.val, nCols.val);
	            /**
	             *	colStart, rowStart, colEnd (string, string, string)
	             */
	            case (colStart.isString && rowStart.isString && colEnd.isString && areEmpty(all, ['colStart', 'rowStart', 'colEnd'])):
	                return this._initString(`${colStart.val}${rowStart.val}:${colEnd.val}${rowStart.val}`);
	            /**
	             *	colStart, rowStart, colEnd (number, number, number)
	             */
	            case (colStart.isNumber && rowStart.isNumber && colEnd.isNumber && areEmpty(all, ['colStart', 'rowStart', 'colEnd'])):
	                return this._initNumber(colStart.val, rowStart.val, 1, colEnd.val - colStart.val + 1);
	            /**
	             *	colStart, rowStart, rowEnd (string, string, string)
	             */
	            case (colStart.isString && rowStart.isString && rowEnd.isString && areEmpty(all, ['colStart', 'rowStart', 'rowEnd'])):
	                return this._initString(`${colStart.val}${rowStart.val}:${colStart.val}${rowEnd.val}`);
	            /**
	             *	colStart, rowStart, rowEnd (number, number, number)
	             */
	            case (colStart.isNumber && rowStart.isNumber && rowEnd.isNumber && areEmpty(all, ['colStart', 'rowStart', 'rowEnd'])):
	                return this._initNumber(colStart.val, rowStart.val, rowEnd.val - rowStart.val + 1);
	            /**
	             *	colStart, rowStart, colEnd, rowEnd (string, string, string, string)
	             */
	            case (colStart.isString && rowStart.isString && colEnd.isString && rowEnd.isString && areEmpty(all, ['colStart', 'rowStart', 'colEnd', 'rowEnd'])):
	                return this._initString(`${colStart.val}${rowStart.val}:${colEnd.val}${rowEnd.val}`);
	            /**
	             *	colStart, rowStart, colEnd, rowEnd (number, number, number, number)
	             */
	            case (colStart.isNumber && rowStart.isNumber && colEnd.isNumber && rowEnd.isNumber && areEmpty(all, ['colStart', 'rowStart', 'colEnd', 'rowEnd'])):
	                return this._initNumber(colStart.val, rowStart.val, rowEnd.val - rowStart.val + 1, colEnd.val - colStart.val + 1);
	            /**
	             *	Invalid arguments combination
	             */
	            default:
	                throw new A1Error(options).wasUnknown();
	        }
	    }
	    /**
	     *	It handles cases:
	     *	constructor(col: number, row: number)
	     *	constructor(col: number, row: number, nRows: number)
	     *	constructor(col: number, row: number, nRows: number, nCols: number)
	     *	@param {number[]} args
	     */
	    _initNumber(...args) {
	        let [col, row, nRows, nCols] = args;
	        nRows = nRows || 1;
	        nCols = nCols || 1;
	        let all = [col, row, nRows, nCols];
	        if (!all.every(n => isValidNumber(n)))
	            throw new A1Error(all.join(', ')).wasNumber();
	        this._colStart = col; // the first col
	        this._rowStart = row; // the first row
	        this._colEnd = col + nCols - 1; // how many cols in total (cols length)
	        this._rowEnd = row + nRows - 1; // how many rows in total (rows length)
	    }
	    /**
	     *	It handles cases:
	     *	constructor(range: string)
	     *	constructor(rangeStart: string, rangeEnd: string)
	     *	@param {string[]} args
	     */
	    _initString(...args) {
	        let [rangeStart, rangeEnd] = args, range = rangeEnd
	            ? `${rangeStart}:${rangeEnd}` // rangeStart: string, rangeEnd: string
	            : rangeStart; // range: string
	        if (!isValidA1(range))
	            throw new A1Error(range).wasString();
	        let { cs, rs, ce, re } = A1._parse(range, this._converter);
	        this._colStart = cs;
	        this._rowStart = rs;
	        this._colEnd = ce;
	        this._rowEnd = re;
	    }
	    /***********
	     *	METHODS
	     ***********/
	    /**
	     *	@return {string} in A1 notation
	     */
	    get() {
	        let start = ColA1(this._colStart) + RowA1(this._rowStart), end = ColA1(this._colEnd) + RowA1(this._rowEnd);
	        return start === end ? start : `${start}:${end}`;
	    }
	    /**
	     *	@return {string} in A1 notation
	     */
	    toString() {
	        return this.get();
	    }
	    /**
	     *	@typedef {Object} Result
	     *	@property {number} colStart
	     *	@property {number} rowStart
	     *	@property {number} colEnd
	     *	@property {number} rowEnd
	     *	@property {string} a1
	     *	@property {number} rowsCount
	     *	@property {number} colsCount
	     *
	     *	@return {Result} full information about range
	     */
	    toJSON() {
	        return {
	            colStart: this._colStart,
	            rowStart: this._rowStart,
	            colEnd: this._colEnd,
	            rowEnd: this._rowEnd,
	            a1: this.get(),
	            rowsCount: this._rowEnd - this._rowStart + 1,
	            colsCount: this._colEnd - this._colStart + 1,
	        };
	    }
	    /**
	     *	@return {number} start column
	     */
	    getCol() {
	        return this._colStart;
	    }
	    /**
	     *	@return {number} end column
	     */
	    getLastCol() {
	        return this._colEnd;
	    }
	    /**
	     *	@return {number} start row
	     */
	    getRow() {
	        return this._rowStart;
	    }
	    /**
	     *	@return {number} end row
	     */
	    getLastRow() {
	        return this._rowEnd;
	    }
	    /**
	     *	@return {number} columns count
	     */
	    getWidth() {
	        return this._colEnd - this._colStart + 1;
	    }
	    /**
	     *	@return {number} rows count
	     */
	    getHeight() {
	        return this._rowEnd - this._rowStart + 1;
	    }
	    /**
	     *	@return {A1} copy of this object
	     */
	    copy() {
	        return new A1(this.get());
	    }
	    /**
	     *	Adds N cells to range along the x-axis
	     *	if count >= 0 - adds to right
	     *	if count <  0 - adds to left
	     *	@param {number} count
	     *
	     *	@return {this}
	     */
	    addX(count) {
	        if (!isValidNumber(count, false))
	            throw new A1Error(count).wasUnknown();
	        count >= 0
	            ? this._colEnd += count
	            : this._colStart += count;
	        (this._colStart <= 0) && (this._colStart = 1);
	        return this;
	    }
	    /**
	     *	Adds N cells to range along the y-axis
	     *	if count >= 0 - adds to bottom
	     *	if count <  0 - adds to top
	     *	@param {number} count
	     *
	     *	@return {this}
	     */
	    addY(count) {
	        if (!isValidNumber(count, false))
	            throw new A1Error(count).wasUnknown();
	        count >= 0
	            ? this._rowEnd += count
	            : this._rowStart += count;
	        (this._rowStart <= 0) && (this._rowStart = 1);
	        return this;
	    }
	    /**
	     *	Adds N cells to range along the x/y-axis
	     *	@param {number} countX
	     *	@param {number} countY
	     *
	     *	@return {this}
	     */
	    add(countX, countY) {
	        this.addX(countX);
	        this.addY(countY);
	        return this;
	    }
	    /**
	     *	Removes N cells from range along the x-axis
	     *	if count >= 0 - removes from right
	     *	if count <  0 - removes from left
	     *	@param {number} count
	     *
	     *	@return {this}
	     */
	    removeX(count) {
	        if (!isValidNumber(count, false))
	            throw new A1Error(count).wasUnknown();
	        if (count >= 0) {
	            this._colEnd -= count;
	            (this._colEnd < this._colStart) && (this._colEnd = this._colStart);
	        }
	        else {
	            this._colStart -= count;
	            (this._colStart > this._colEnd) && (this._colStart = this._colEnd);
	        }
	        return this;
	    }
	    /**
	     *	Removes N cells from range along the y-axis
	     *	if count >= 0 - removes from bottom
	     *	if count <  0 - removes from top
	     *	@param {number} count
	     *
	     *	@return {this}
	     */
	    removeY(count) {
	        if (!isValidNumber(count, false))
	            throw new A1Error(count).wasUnknown();
	        if (count >= 0) {
	            this._rowEnd -= count;
	            (this._rowEnd < this._rowStart) && (this._rowEnd = this._rowStart);
	        }
	        else {
	            this._rowStart -= count;
	            (this._rowStart > this._rowEnd) && (this._rowStart = this._rowEnd);
	        }
	        return this;
	    }
	    /**
	     *	Removes N cells from range along the x/y-axis
	     *	@param {number} countX
	     *	@param {number} countY
	     *
	     *	@return {this}
	     */
	    remove(countX, countY) {
	        this.removeX(countX);
	        this.removeY(countY);
	        return this;
	    }
	    /**
	     *	Shifts the range along the x-axis
	     *	If offset >= 0 - shifts to right
	     *	If offset <  0 - shifts to left
	     *	@param {number} offset
	     *
	     *	@return {this}
	     */
	    shiftX(offset) {
	        if (!isValidNumber(offset, false))
	            throw new A1Error(offset).wasUnknown();
	        let diff = this._colEnd - this._colStart, start = this._colStart + offset, end = this._colEnd + offset;
	        this._colStart = start > 0 ? start : 1;
	        this._colEnd = start > 0 ? end : diff + 1;
	        return this;
	    }
	    /**
	     *	Shifts the range along the y-axis
	     *	If offset >= 0 - shifts to bottom
	     *	If offset <  0 - shifts to top
	     *	@param {number} offset
	     *
	     *	@return {this}
	     */
	    shiftY(offset) {
	        if (!isValidNumber(offset, false))
	            throw new A1Error(offset).wasUnknown();
	        let diff = this._rowEnd - this._rowStart, start = this._rowStart + offset, end = this._rowEnd + offset;
	        this._rowStart = start > 0 ? start : 1;
	        this._rowEnd = start > 0 ? end : diff + 1;
	        return this;
	    }
	    /**
	     *	Shifts the range along the x/y-axis
	     *	@param {number} offsetX
	     *	@param {number} offsetY
	     *
	     *	@return {this}
	     */
	    shift(offsetX, offsetY) {
	        this.shiftX(offsetX);
	        this.shiftY(offsetY);
	        return this;
	    }
	}
	// Regular expression for parsing
	A1._reg = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/;

	return A1;

})));
