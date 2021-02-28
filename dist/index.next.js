var A1 = (function () {
  'use strict';

  /**
   * @file Contains converters from string to number and vice versa
   */
  /**
   * Converts column letter to number
   * @author AdamL
   * @see https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
   * @param {string} col
   *
   * @returns {number}
   */
  const colStringToNumber1 = (col) => {
      const length = col.length;
      let column = 0;
      for (let i = 0; i < length; i++)
          column += (col.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
      return column;
  };
  /**
   * Converts column letter to number
   * @author Flambino
   * @see https://codereview.stackexchange.com/questions/90112/a1notation-conversion-to-row-column-index
   * @param {string} col
   *
   * @returns {number}
   */
  const colStringToNumber2 = (col) => {
      let i, l, chr, sum = 0, A = 'A'.charCodeAt(0), radix = 'Z'.charCodeAt(0) - A + 1;
      for (i = 0, l = col.length; i < l; i++) {
          chr = col.charCodeAt(i);
          sum = sum * radix + chr - A + 1;
      }
      return sum;
  };
  /**
   * Converts column number to letter
   * @author AdamL
   * @see https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
   * @param {number} col
   *
   * @returns {string}
   */
  const colNumberToString = (col) => {
      let letter = '', temp;
      while (col > 0) {
          temp = (col - 1) % 26;
          letter = String.fromCharCode(temp + 65) + letter;
          col = (col - temp - 1) / 26;
      }
      return letter;
  };
  /**
   * Converts row string to number
   * @param {string} row
   *
   * @returns {number}
   */
  const rowStringToNumber = (row) => parseInt(row, 10);
  /**
   * Converts row number to string
   * @param {number} row
   *
   * @returns {string}
   */
  const rowNumberToString = (row) => String(row);

  /**
   * @file Contains secondary functions
   */
  /**
   * Returns the type of a value
   * @param {unknown} some
   *
   * @returns {string}
   */
  const type = (some) => typeof some;
  /**
   * Checks if a value is a string
   * @param {unknown} some
   *
   * @returns {boolean}
   */
  const isString = (some) => type(some) === 'string';
  /**
   * Checks if a value is a number
   * @param {unknown} some
   *
   * @returns {boolean}
   */
  const isNumber = (some) => type(some) === 'number' && Number.isInteger(some);
  /**
   * Checks if a value is a positive number
   * @param {unknown} some
   *
   * @returns {boolean}
   */
  const isPositiveNumber = (some) => isNumber(some) && some > 0;
  /**
   * Checks if a value is a stringified number like "1", "2", ...
   * @param {unknown} some
   *
   * @returns {boolean}
   */
  const isStringifiedNumber = (some) => isString(some) && /^[0-9]+$/.test(some) && isNumber(+some);
  /**
   * Checks if a value is a letter between a-zA-Z
   * @param {unknown} some
   *
   * @returns {boolean}
   */
  const isLetter = (some) => isString(some) && /^[a-z]+$/i.test(some);
  /**
   * Checks validation of A1 notation
   * @param {unknown} some
   *
   * @returns {boolean}
   */
  const isValidA1 = (some) => isString(some) && /^[A-Z]+\d+(:[A-Z]+\d+)?$/i.test(some);

  /**
   * @fileOverview A1 notation errors
   */
  class A1Error extends Error {
      constructor(something) {
          const str = JSON.stringify(something);
          super(str);
          this.name = 'A1Error';
          this.message = str;
      }
      /**
       * Was string
       */
      s() {
          this.message = `Invalid A1 notation: ${this.message}`;
          return this;
      }
      /**
       * Was number
       */
      n() {
          this.message = `Invalid A1 number(s): ${this.message}`;
          return this;
      }
      /**
       * Was unknown
       */
      u() {
          this.message = `Invalid A1 argument(s): ${this.message}`;
          return this;
      }
  }

  /**
   * @file Math operations and converting in A1 notation
   * Supports A1 notation like "A1" and "A1:B2"
   * @author FLighter
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
              throw new A1Error().u();
          // Object
          if (something && type(something) === 'object')
              this._initObject(something);
          // Number
          else if (isNumber(something))
              this._initNumber.apply(this, arguments);
          // String
          else if (isString(something))
              this._initString.apply(this, arguments);
          // Unknown argument
          else
              throw new A1Error(something).u();
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
          const colStart = this._A1Col(cs, converter), colEnd = this._A1Col(ce, converter), rowStart = rowStringToNumber(rs), rowEnd = rowStringToNumber(re);
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
          return converter === 1 ? colStringToNumber1(a1) : colStringToNumber2(a1);
      }
      /******************
       * STATIC METHODS
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
              throw new A1Error(a1).s();
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
              throw new A1Error(a1).s();
          return this._parse(a1, converter).ce;
      }
      /**
       *	Converts number to column letter in A1
       *	@param {number} col
       *
       *	@return {string}
       */
      static toCol(col) {
          if (!isPositiveNumber(col))
              throw new A1Error(col).n();
          return colNumberToString(col);
      }
      /**
       *	Converts the first row string to number
       *	@param {string} a1
       *
       *	@return {number}
       */
      static getRow(a1) {
          if (!isValidA1(a1))
              throw new A1Error(a1).s();
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
              throw new A1Error(a1).s();
          return this._parse(a1, 1).re;
      }
      /**
       *	Converts number to row string in A1
       *	@param {number} row
       *
       *	@return {string}
       */
      static toRow(row) {
          if (!isPositiveNumber(row))
              throw new A1Error(row).n();
          return rowNumberToString(row);
      }
      /**
       *	@param {string} a1
       *	@param {1 | 2} [converter = 1]
       *
       *	@return {number} columns count
       */
      static getWidth(a1, converter = 1) {
          if (!isValidA1(a1))
              throw new A1Error(a1).s();
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
              throw new A1Error(a1).s();
          let { re, rs } = this._parse(a1, 1);
          return re - rs + 1;
      }
      /***************
       * CONSTRUCTOR
       ***************/
      /**
       *	It handles case:
       *	constructor(object: options)
       *	@param {options} options
       */
      _initObject(options) {
          const { a1Start, a1End, colStart, colEnd, rowStart, rowEnd, nCols, nRows, converter, } = options;
          // Set converter
          this._converter = converter === 2 ? 2 : 1;
          let cs, ce, rs, re;
          const getValue = (some, canBeLetter = true) => {
              if (isPositiveNumber(some) || isStringifiedNumber(some))
                  return +some;
              if (canBeLetter && isLetter(some))
                  return A1._A1Col(some, this._converter);
              return 0;
          };
          /**
           * Define start range
           */
          // From a1Start
          if (isValidA1(a1Start)) {
              const a1StartParsed = A1._parse(a1Start, this._converter);
              cs = a1StartParsed.cs;
              rs = a1StartParsed.rs;
              const equalCol = a1StartParsed.cs === a1StartParsed.ce, equalRow = a1StartParsed.rs === a1StartParsed.re, equal = equalCol && equalRow;
              if (!equal || (equal && a1Start.includes(':'))) {
                  ce = a1StartParsed.ce;
                  re = a1StartParsed.re;
              }
          }
          // From colStart & rowStart
          if (!cs && colStart)
              cs = getValue(colStart);
          if (!rs && rowStart)
              rs = getValue(rowStart, false);
          /**
           * Define end range
           */
          // From a1End
          if (!ce && !re && isValidA1(a1End)) {
              const a1EndParsed = A1._parse(a1End, this._converter);
              ce = a1EndParsed.ce;
              re = a1EndParsed.re;
          }
          // From colEnd & rowEnd
          if (!ce && colEnd)
              ce = getValue(colEnd);
          if (!re && rowEnd)
              re = getValue(rowEnd, false);
          // From nCols & nRows
          if (!ce && cs && isPositiveNumber(nCols))
              ce = cs + nCols - 1;
          if (!re && rs && isPositiveNumber(nRows))
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
              throw new A1Error(options).u();
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
          if (!all.every(n => isPositiveNumber(n)))
              throw new A1Error(all.join(', ')).n();
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
              throw new A1Error(range).s();
          const { cs, rs, ce, re } = A1._parse(range, this._converter);
          this._colStart = cs;
          this._rowStart = rs;
          this._colEnd = ce;
          this._rowEnd = re;
      }
      /***********
       * METHODS
       ***********/
      /**
       *	@return {string} in A1 notation
       */
      get() {
          const start = colNumberToString(this._colStart) + rowNumberToString(this._rowStart), end = colNumberToString(this._colEnd) + rowNumberToString(this._rowEnd);
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
       *	@return {Result} full information about the range
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
       * Sets a value to the start column
       * @param {string | number} val
       *
       * @returns {this}
       */
      setCol(val) {
          return this._setFields(val, '_colStart');
      }
      /**
       * Sets a value to the end column
       * @param {string | number} val
       *
       * @returns {this}
       */
      setLastCol(val) {
          return this._setFields(val, '_colEnd');
      }
      /**
       * Sets a value to the start row
       * @param {string | number} val
       *
       * @returns {this}
       */
      setRow(val) {
          return this._setFields(val, '_rowStart', false);
      }
      /**
       * Sets a value to the end row
       * @param {string | number} val
       *
       * @returns {this}
       */
      setLastRow(val) {
          return this._setFields(val, '_rowEnd', false);
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
          return this._addFields(count, '_colStart', '_colEnd');
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
          return this._addFields(count, '_rowStart', '_rowEnd');
      }
      /**
       *	Adds N cells to range along the x/y-axis
       *	@param {number} countX
       *	@param {number} countY
       *
       *	@return {this}
       */
      add(countX, countY) {
          return this.addX(countX).addY(countY);
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
          return this._removeFields(count, '_colStart', '_colEnd');
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
          return this._removeFields(count, '_rowStart', '_rowEnd');
      }
      /**
       *	Removes N cells from range along the x/y-axis
       *	@param {number} countX
       *	@param {number} countY
       *
       *	@return {this}
       */
      remove(countX, countY) {
          return this.removeX(countX).removeY(countY);
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
          return this._shiftFields(offset, '_colStart', '_colEnd');
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
          return this._shiftFields(offset, '_rowStart', '_rowEnd');
      }
      /**
       *	Shifts the range along the x/y-axis
       *	@param {number} offsetX
       *	@param {number} offsetY
       *
       *	@return {this}
       */
      shift(offsetX, offsetY) {
          return this.shiftX(offsetX).shiftY(offsetY);
      }
      /**
       * Sets a value to the specified field
       * @param {string | number} val
       * @param {string} field
       * @param {boolean} [canBeLetter = true]
       *
       * @returns {this}
       */
      _setFields(val, field, canBeLetter = true) {
          if (isPositiveNumber(val) || isStringifiedNumber(val))
              this[field] = +val;
          else if (canBeLetter && isLetter(val))
              this[field] = A1._A1Col(val, this._converter);
          else
              throw new A1Error(val).u();
          return this;
      }
      /**
       * Adds N cells to the range along the x/y-axis
       * @param {number} count
       * @param {string} fieldStart
       * @param {string} fieldEnd
       *
       * @returns {this}
       */
      _addFields(count, fieldStart, fieldEnd) {
          if (!isNumber(count))
              throw new A1Error(count).u();
          count >= 0
              ? this[fieldEnd] += count
              : this[fieldStart] += count;
          (this[fieldStart] <= 0) && (this[fieldStart] = 1);
          return this;
      }
      /**
       * Removes N cells from the range along the x/y-axis
       * @param {number} count
       * @param {string} fieldStart
       * @param {string} fieldEnd
       *
       * @returns {this}
       */
      _removeFields(count, fieldStart, fieldEnd) {
          if (!isNumber(count))
              throw new A1Error(count).u();
          if (count >= 0) {
              this[fieldEnd] -= count;
              (this[fieldEnd] < this[fieldStart]) && (this[fieldEnd] = this[fieldStart]);
          }
          else {
              this[fieldStart] -= count;
              (this[fieldStart] > this[fieldEnd]) && (this[fieldStart] = this[fieldEnd]);
          }
          return this;
      }
      /**
       * Shifts the specified fields along x/y-axis
       * @param {number} offset
       * @param {string} fieldStart
       * @param {string} fieldEnd
       *
       * @returns {this}
       */
      _shiftFields(offset, fieldStart, fieldEnd) {
          if (!isNumber(offset))
              throw new A1Error(offset).u();
          const diff = this[fieldEnd] - this[fieldStart], start = this[fieldStart] + offset, end = this[fieldEnd] + offset;
          this[fieldStart] = start > 0 ? start : 1;
          this[fieldEnd] = start > 0 ? end : diff + 1;
          return this;
      }
  }
  // Regular expression for parsing
  A1._reg = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/;

  return A1;

}());
//# sourceMappingURL=index.next.js.map
