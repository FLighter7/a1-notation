var A1 = (function () {
	'use strict';

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
	 *	@param {boolean} [positiveOnly = true]
	 *
	 *	@return {boolean}
	 */
	function isValidNumber (n, positiveOnly = true) {
	    const isNumber = typeof n === 'number' && Number.isInteger(n);
	    return positiveOnly ? (isNumber && +n > 0) : isNumber;
	}

	/**
	 *	@fileOverview A1 notation errors
	 */
	class A1Error extends Error {
	    constructor(something) {
	        const str = JSON.stringify(something);
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
	        const type = typeof something;
	        // Object
	        if (something && type === 'object')
	            this._initObject(something);
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
	        const colStart = this._A1Col(cs, converter), colEnd = this._A1Col(ce, converter), rowStart = A1Row(rs), rowEnd = A1Row(re);
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
	     *	@param {options} options
	     */
	    _initObject(options) {
	        const isString = (some) => typeof some === 'string';
	        const isNumber = isValidNumber;
	        const isLetter = (some) => /^[a-z]+$/i.test(some);
	        const isStrNumber = (some) => typeof some === 'string' ? /^[0-9]+$/.test(some) : false;
	        const isStringifiedNumber = (some) => isStrNumber(some) && isNumber(+some);
	        const { a1Start, a1End, colStart, colEnd, rowStart, rowEnd, nCols, nRows, converter, } = options;
	        // Set converter
	        this._converter = converter === 2 ? 2 : 1;
	        let cs, ce, rs, re;
	        /**
	         * Define start range
	         */
	        // From a1Start
	        if (isString(a1Start) && isValidA1(a1Start)) {
	            const a1StartParsed = A1._parse(a1Start, this._converter);
	            cs = a1StartParsed.cs;
	            rs = a1StartParsed.rs;
	            const equalCol = a1StartParsed.cs === a1StartParsed.ce, equalRow = a1StartParsed.rs === a1StartParsed.re, equal = equalCol && equalRow;
	            if (!equal || (equal && a1Start.includes(':'))) {
	                ce = a1StartParsed.ce;
	                re = a1StartParsed.re;
	            }
	        }
	        // From colStart
	        if (!cs && colStart) {
	            if (isNumber(colStart))
	                cs = colStart;
	            else if (isString(colStart)) {
	                if (isLetter(colStart))
	                    cs = A1._A1Col(colStart, this._converter);
	                else if (isStringifiedNumber(colStart))
	                    cs = +colStart;
	            }
	        }
	        // From rowStart
	        if (!rs && (isNumber(rowStart) || isStringifiedNumber(rowStart)))
	            rs = +rowStart;
	        /**
	         * Define end range
	         */
	        // From a1End
	        if (!ce && !re && isString(a1End) && isValidA1(a1End)) {
	            const a1EndParsed = A1._parse(a1End, this._converter);
	            ce = a1EndParsed.ce;
	            re = a1EndParsed.re;
	        }
	        // From colEnd
	        if (!ce && colEnd) {
	            if (isNumber(colEnd))
	                ce = colEnd;
	            else if (isString(colEnd)) {
	                if (isLetter(colEnd))
	                    ce = A1._A1Col(colEnd, this._converter);
	                else if (isStringifiedNumber(colEnd))
	                    ce = +colEnd;
	            }
	        }
	        // From rowEnd
	        if (!re && (isNumber(rowEnd) || isStringifiedNumber(rowEnd)))
	            re = +rowEnd;
	        // From nCols
	        if (!ce && cs && isNumber(nCols))
	            ce = cs + nCols - 1;
	        // From nRows
	        if (!re && rs && isNumber(nRows))
	            re = rs + nRows - 1;
	        /**
	         * If only start/end range was defined
	         */
	        (cs && !ce) && (ce = cs);
	        (!cs && ce) && (cs = ce);
	        (rs && !re) && (re = rs);
	        (!rs && re) && (rs = re);
	        /**
	         * Check results
	         */
	        if (!cs || !rs || !ce || !re)
	            throw new A1Error(options).wasUnknown();
	        /**
	         * Set ranges
	         */
	        this._colStart = cs;
	        this._rowStart = rs;
	        this._colEnd = ce;
	        this._rowEnd = re;
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
	        const [rangeStart, rangeEnd] = args;
	        const range = rangeEnd
	            ? `${rangeStart}:${rangeEnd}` // rangeStart: string, rangeEnd: string
	            : rangeStart; // range: string
	        if (!isValidA1(range))
	            throw new A1Error(range).wasString();
	        const { cs, rs, ce, re } = A1._parse(range, this._converter);
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

}());
//# sourceMappingURL=index.next.js.map
