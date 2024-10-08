/**
 * @file Math operations and converting in A1 notation
 * Supports A1 notation like "A1" and "A1:B2"
 * @author FLighter
 */

import {
  colStringToNumber1,// converter 1
  colStringToNumber2,// converter 2
  colNumberToString,
  rowStringToNumber,
  rowNumberToString,
} from './converters';
import {
  type,
  isString,
  isNumber,
  isPositiveNumber,
  isStringifiedNumber,
  isLetter,
  isValidA1,
} from './helpers';
import A1Error from './A1Error';
import options from './options';
import {Axis} from './enums';

class A1
{
  // Regular expression for parsing
  private static _reg:RegExp = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/;

  /**
   *	Example: A1:B2
   */
  private _colStart: number = 0;// A -> 1
  private _rowStart: number = 0;// 1 -> 1
  private _colEnd:   number = 0;// B -> 2
  private _rowEnd:   number = 0;// 2 -> 2
  private _converter: 1 | 2 = 1;// converter 1 | 2

  /**
   *	Parses A1 notation
   *	@param {string} a1
   *	@param {1 | 2}  converter
   *
   *	@return {object} {cs: number, rs: number, ce: number, re: number}
   */
  private static _parse(a1: string, converter: 1 | 2): {cs: number, rs: number, ce: number, re: number}
  {
    let [
        ,
        cs,// col start // A
        rs,// row start // 1
        ce,// col end 	// B
        re,// row end 	// 2
      ] = a1.toUpperCase().match(this._reg) ?? [];
    ce = ce || cs;
    re = re || rs;
    const colStart = this._A1Col(cs, converter),
          colEnd   = this._A1Col(ce, converter),
          rowStart = rowStringToNumber(rs),
          rowEnd   = rowStringToNumber(re);
    // For non-standard A1
    return {
      cs: colEnd > colStart ? colStart : colEnd,
      rs: rowEnd > rowStart ? rowStart : rowEnd,
      ce: colEnd > colStart ? colEnd 	 : colStart,
      re: rowEnd > rowStart ? rowEnd 	 : rowStart,
    }
  }

  /**
   *	Converts column letter to number using converter 1 or 2
   *	@param {string} a1
   *	@param {1 | 2} converter
   *
   *	@return {number}
   */
  private static _A1Col(a1: string, converter: 1 | 2): number
  {
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
  static isValid(a1: string): boolean
  {
    return isValidA1(a1);
  }

  /**
   *	Converts the first column letter from A1 to number
   *	@param {string} a1
   *	@param {1 | 2} [converter = 1]
   *
   *	@return {number}
   */
  static getCol(a1: string, converter: 1 | 2 = 1): number
  {
    if(!isValidA1(a1))
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
  static getLastCol(a1: string, converter: 1 | 2 = 1): number
  {
    if(!isValidA1(a1))
      throw new A1Error(a1).s();
    return this._parse(a1, converter).ce;
  }

  /**
   *	Converts number to column letter in A1
   *	@param {number} col
   *
   *	@return {string}
   */
  static toCol(col: number): string
  {
    if(!isPositiveNumber(col))
      throw new A1Error(col).n();
    return colNumberToString(col);
  }

  /**
   *	Converts the first row string to number
   *	@param {string} a1
   *
   *	@return {number}
   */
  static getRow(a1: string): number
  {
    if(!isValidA1(a1))
      throw new A1Error(a1).s();
    return this._parse(a1, 1).rs;
  }

  /**
   *	Converts the last row string to number
   *	@param {string} a1
   *
   *	@return {number}
   */
  static getLastRow(a1: string): number
  {
    if(!isValidA1(a1))
      throw new A1Error(a1).s();
    return this._parse(a1, 1).re;
  }

  /**
   *	Converts number to row string in A1
   *	@param {number} row
   *
   *	@return {string}
   */
  static toRow(row: number): string
  {
    if(!isPositiveNumber(row))
      throw new A1Error(row).n();
    return rowNumberToString(row);
  }

  /**
   *	@param {string} a1
   *	@param {1 | 2} [converter = 1]
   *
   *	@return {number} columns count
   */
  static getWidth(a1: string, converter: 1 | 2 = 1): number
  {
    if(!isValidA1(a1))
      throw new A1Error(a1).s();
    let {ce, cs} = this._parse(a1, converter);
    return ce - cs + 1;
  }

  /**
   *	@param {string} a1
   *
   *	@return {number} rows count
   */
  static getHeight(a1: string): number
  {
    if(!isValidA1(a1))
      throw new A1Error(a1).s();
    let {re, rs} = this._parse(a1, 1);
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
  private _initObject(options: options): void
  {
    const {
      a1Start,
      a1End,
      colStart,
      colEnd,
      rowStart,
      rowEnd,
      nCols,
      nRows,
      converter,
    } = options;

    // Set converter
    this._converter = converter === 2 ? 2 : 1;

    let cs: number = 0;
    let ce: number = 0;
    let rs: number = 0;
    let re: number = 0;

    const getValue = (some: unknown, canBeLetter: boolean = true): number =>
    {
      if(isPositiveNumber(some) || isStringifiedNumber(some))
        return +some;
      if(canBeLetter && isLetter(some))
        return A1._A1Col(some as string, this._converter);
      return 0;
    };

    /**
     * Define start range
     */

    // From a1Start
    if(isValidA1(a1Start))
    {
      const a1StartParsed = A1._parse(a1Start, this._converter);
      cs = a1StartParsed.cs;
      rs = a1StartParsed.rs;
      const equalCol = a1StartParsed.cs === a1StartParsed.ce,
            equalRow = a1StartParsed.rs === a1StartParsed.re,
            equal    = equalCol && equalRow;
      if(!equal || (equal && a1Start.includes(':')))
      {
        ce = a1StartParsed.ce;
        re = a1StartParsed.re;
      }
    }

    // From colStart & rowStart
    if(!cs && colStart) {
      cs = getValue(colStart);
    }

    if(!rs && rowStart) {
      rs = getValue(rowStart, false);
    }

    /**
     * Define end range
     */

    // From a1End
    if(!ce && !re && isValidA1(a1End))
    {
      const a1EndParsed = A1._parse(a1End, this._converter);
      ce = a1EndParsed.ce;
      re = a1EndParsed.re;
    }

    // From colEnd & rowEnd
    if(!ce && colEnd)
      ce = getValue(colEnd);
    if(!re && rowEnd)
      re = getValue(rowEnd, false);

    // From nCols & nRows
    if(!ce && cs && isPositiveNumber(nCols))
      ce = cs + nCols - 1;
    if(!re && rs && isPositiveNumber(nRows))
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
    if(!cs || !rs || !ce || !re)
      throw new A1Error(options).u();

    /**
     * Set ranges
     */
    this._colStart = cs;
    this._rowStart = rs;
    this._colEnd   = ce;
    this._rowEnd   = re;
  }

  /**
   *	It handles cases:
   *	constructor(col: number, row: number)
   *	constructor(col: number, row: number, nRows: number)
   *	constructor(col: number, row: number, nRows: number, nCols: number)
   *	@param {number[]} args
   */
  private _initNumber(...args: number[]): void
  {
    let [col, row, nRows, nCols] = args;
    nRows = nRows || 1;
    nCols = nCols || 1;
    let all = [col, row, nRows, nCols];
    if(!all.every(n => isPositiveNumber(n)))
      throw new A1Error(all.join(', ')).n();
    this._colStart 	= col;				// the first col
    this._rowStart 	= row;				// the first row
    this._colEnd 	= col + nCols - 1;	// how many cols in total (cols length)
    this._rowEnd 	= row + nRows - 1;	// how many rows in total (rows length)
  }

  /**
   *	It handles cases:
   *	constructor(range: string)
   *	constructor(rangeStart: string, rangeEnd: string)
   *	@param {string[]} args
   */
  private _initString(...args: string[]): void
  {
    const [rangeStart, rangeEnd] = args;
    const range = rangeEnd
      ? `${rangeStart}:${rangeEnd}`// rangeStart: string, rangeEnd: string
      : rangeStart;                // range: string
    if(!isValidA1(range))
      throw new A1Error(range).s();
    const {cs, rs, ce, re} = A1._parse(range, this._converter);
    this._colStart = cs;
    this._rowStart = rs;
    this._colEnd   = ce;
    this._rowEnd   = re;
  }

  /**
   * Constructor
   */
  constructor(object: options)
  constructor(range: string)
  constructor(rangeStart: string, rangeEnd: string)
  constructor(col: number, row: number)
  constructor(col: number, row: number, nRows: number)
  constructor(col: number, row: number, nRows: number, nCols: number)
  constructor(something: string | number | options, something2?: string | number, nRows?: number, nCols?: number)
  {
    // No arguments
    if(!arguments.length)
      throw new A1Error().u();
    // Object
    if(something && type(something) === 'object')
      this._initObject(something as options);
    // Number
    else if(isNumber(something))
      this._initNumber.apply(this, arguments);
    // String
    else if(isString(something))
      this._initString.apply(this, arguments);
    // Unknown argument
    else
      throw new A1Error(something).u();
  }

  /***********
   * METHODS
   ***********/

  /**
   *	@return {string} in A1 notation
   */
  get(): string
  {
    const start = colNumberToString(this._colStart)+rowNumberToString(this._rowStart),
          end   = colNumberToString(this._colEnd)+rowNumberToString(this._rowEnd);
    return start === end ? start : `${start}:${end}`;
  }

  /**
   *	@return {string} in A1 notation
   */
  toString(): string
  {
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
  toJSON(): {
    colStart:  number,
    rowStart:  number,
    colEnd:    number,
    rowEnd:    number,
    a1:        string,
    rowsCount: number,
    colsCount: number,
  }
  {
    return {
      colStart:  this._colStart,
      rowStart:  this._rowStart,
      colEnd:    this._colEnd,
      rowEnd:    this._rowEnd,
      a1:        this.get(),
      rowsCount: this._rowEnd - this._rowStart + 1,
      colsCount: this._colEnd - this._colStart + 1,
    }
  }

  /**
   *	@return {number} start column
   */
  getCol(): number
  {
    return this._colStart;
  }

  /**
   *	@return {number} end column
   */
  getLastCol(): number
  {
    return this._colEnd;
  }

  /**
   *	@return {number} start row
   */
  getRow(): number
  {
    return this._rowStart;
  }

  /**
   *	@return {number} end row
   */
  getLastRow(): number
  {
    return this._rowEnd;
  }

  /**
   *	@return {number} columns count
   */
  getWidth(): number
  {
    return this._colEnd - this._colStart + 1;
  }

  /**
   *	@return {number} rows count
   */
  getHeight(): number
  {
    return this._rowEnd - this._rowStart + 1;
  }

  /**
   *	@return {A1} copy of this object
   */
  copy(): A1
  {
    return new A1(this.get());
  }

  /**
   * Sets a value to the start column
   * @param {string | number} val
   *
   * @returns {this}
   */
  setCol(val: string | number): this
  {
    return this._setFields(val, '_colStart', Axis.X);
  }

  /**
   * Sets a value to the end column
   * @param {string | number} val
   *
   * @returns {this}
   */
  setLastCol(val: string | number): this
  {
    return this._setFields(val, '_colEnd', Axis.X);
  }

  /**
   * Sets a value to the start row
   * @param {string | number} val
   *
   * @returns {this}
   */
  setRow(val: string | number): this
  {
    return this._setFields(val, '_rowStart', Axis.Y, false);
  }

  /**
   * Sets a value to the end row
   * @param {string | number} val
   *
   * @returns {this}
   */
  setLastRow(val: string | number): this
  {
    return this._setFields(val, '_rowEnd', Axis.Y, false);
  }

  /**
   *	Adds N cells to range along the x-axis
   *	if count >= 0 - adds to right
   *	if count <  0 - adds to left
   *	@param {number} count
   *
   *	@return {this}
   */
  addX(count: number): this
  {
    return this._addFields(count, Axis.X);
  }

  /**
   *	Adds N cells to range along the y-axis
   *	if count >= 0 - adds to bottom
   *	if count <  0 - adds to top
   *	@param {number} count
   *
   *	@return {this}
   */
  addY(count: number): this
  {
    return this._addFields(count, Axis.Y);
  }

  /**
   *	Adds N cells to range along the x/y-axis
   *	@param {number} countX
   *	@param {number} countY
   *
   *	@return {this}
   */
  add(countX: number, countY: number): this
  {
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
  removeX(count: number): this
  {
    return this._removeFields(count, Axis.X);
  }

  /**
   *	Removes N cells from range along the y-axis
   *	if count >= 0 - removes from bottom
   *	if count <  0 - removes from top
   *	@param {number} count
   *
   *	@return {this}
   */
  removeY(count: number): this
  {
    return this._removeFields(count, Axis.Y);
  }

  /**
   *	Removes N cells from range along the x/y-axis
   *	@param {number} countX
   *	@param {number} countY
   *
   *	@return {this}
   */
  remove(countX: number, countY: number): this
  {
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
  shiftX(offset: number): this
  {
    return this._shiftFields(offset, Axis.X);
  }

  /**
   *	Shifts the range along the y-axis
   *	If offset >= 0 - shifts to bottom
   *	If offset <  0 - shifts to top
   *	@param {number} offset
   *
   *	@return {this}
   */
  shiftY(offset: number): this
  {
    return this._shiftFields(offset, Axis.Y);
  }

  /**
   *	Shifts the range along the x/y-axis
   *	@param {number} offsetX
   *	@param {number} offsetY
   *
   *	@return {this}
   */
  shift(offsetX: number, offsetY: number): this
  {
    return this.shiftX(offsetX).shiftY(offsetY);
  }

  /**
   * Sets a value to the specified field
   * @param {string | number} val
   * @param {string} field
   * @param {Axis} axis
   * @param {boolean} [canBeLetter = true]
   *
   * @returns {this}
   */
  private _setFields(
    val: string | number,
    field: string,
    axis: Axis,
    canBeLetter: boolean = true,
  ): this
  {
    if(isPositiveNumber(val) || isStringifiedNumber(val))
      this[field] = +val;
    else if(canBeLetter && isLetter(val))
      this[field] = A1._A1Col(val as string, this._converter);
    else
      throw new A1Error(val).u();

    if(this[`_${axis}Start`] > this[`_${axis}End`])
      throw new A1Error(`The first column or row can't be bigger than the last, got: ${val}`);

    return this;
  }

  /**
   * Adds N cells to the range along the x/y-axis
   * @param {number} count
   * @param {Axis} axis
   *
   * @returns {this}
   */
  private _addFields(count: number, axis: Axis): this
  {
    if(!isNumber(count))
      throw new A1Error(count).u();
    const fieldStart = `_${axis}Start`,
          fieldEnd   = `_${axis}End`;
    count >= 0
      ? this[fieldEnd]   += count
      : this[fieldStart] += count;
    (this[fieldStart] <= 0) && (this[fieldStart] = 1);
    return this;
  }

  /**
   * Removes N cells from the range along the x/y-axis
   * @param {number} count
   * @param {Axis} axis
   *
   * @returns {this}
   */
  private _removeFields(count: number, axis: Axis): this
  {
    if(!isNumber(count))
      throw new A1Error(count).u();
    const fieldStart = `_${axis}Start`,
          fieldEnd   = `_${axis}End`;
    if(count >= 0)
    {
      this[fieldEnd] -= count;
      (this[fieldEnd] < this[fieldStart]) && (this[fieldEnd] = this[fieldStart]);
    }
    else
    {
      this[fieldStart] -= count;
      (this[fieldStart] > this[fieldEnd]) && (this[fieldStart] = this[fieldEnd]);
    }
    return this;
  }

  /**
   * Shifts the specified fields along x/y-axis
   * @param {number} offset
   * @param {Axis} axis
   *
   * @returns {this}
   */
  private _shiftFields(offset: number, axis: Axis): this
  {
    if(!isNumber(offset))
      throw new A1Error(offset).u();
    const fieldStart = `_${axis}Start`,
          fieldEnd   = `_${axis}End`;
    const diff  = this[fieldEnd] - this[fieldStart],
          start = this[fieldStart] + offset,
          end   = this[fieldEnd]   + offset;
    this[fieldStart] = start > 0 ? start : 1;
    this[fieldEnd]   = start > 0 ? end   : diff + 1;
    return this;
  }
}

export default A1;
