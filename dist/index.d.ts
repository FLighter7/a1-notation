/**
 * @file Math operations and converting in A1 notation
 * Supports A1 notation like "A1" and "A1:B2"
 * @author FLighter
 */
import options from './options';
declare class A1 {
    private static _reg;
    /**
     *	Example: A1:B2
     */
    private _colStart;
    private _rowStart;
    private _colEnd;
    private _rowEnd;
    private _converter;
    /**
     *	Parses A1 notation
     *	@param {string} a1
     *	@param {1 | 2}  converter
     *
     *	@return {object} {cs: number, rs: number, ce: number, re: number}
     */
    private static _parse;
    /**
     *	Converts column letter to number using converter 1 or 2
     *	@param {string} a1
     *	@param {1 | 2} converter
     *
     *	@return {number}
     */
    private static _A1Col;
    /******************
     * STATIC METHODS
     ******************/
    /**
     *	Checks A1 notation
     *	@param {string} a1
     *
     *	@return {boolean}
     */
    static isValid(a1: string): boolean;
    /**
     *	Converts the first column letter from A1 to number
     *	@param {string} a1
     *	@param {1 | 2} [converter = 1]
     *
     *	@return {number}
     */
    static getCol(a1: string, converter?: 1 | 2): number;
    /**
     *	Converts the last column letter from A1 to number
     *	@param {string} a1
     *	@param {1 | 2} [converter = 1]
     *
     *	@return {number}
     */
    static getLastCol(a1: string, converter?: 1 | 2): number;
    /**
     *	Converts number to column letter in A1
     *	@param {number} col
     *
     *	@return {string}
     */
    static toCol(col: number): string;
    /**
     *	Converts the first row string to number
     *	@param {string} a1
     *
     *	@return {number}
     */
    static getRow(a1: string): number;
    /**
     *	Converts the last row string to number
     *	@param {string} a1
     *
     *	@return {number}
     */
    static getLastRow(a1: string): number;
    /**
     *	Converts number to row string in A1
     *	@param {number} row
     *
     *	@return {string}
     */
    static toRow(row: number): string;
    /**
     *	@param {string} a1
     *	@param {1 | 2} [converter = 1]
     *
     *	@return {number} columns count
     */
    static getWidth(a1: string, converter?: 1 | 2): number;
    /**
     *	@param {string} a1
     *
     *	@return {number} rows count
     */
    static getHeight(a1: string): number;
    /***************
     * CONSTRUCTOR
     ***************/
    /**
     *	It handles case:
     *	constructor(object: options)
     *	@param {options} options
     */
    private _initObject;
    /**
     *	It handles cases:
     *	constructor(col: number, row: number)
     *	constructor(col: number, row: number, nRows: number)
     *	constructor(col: number, row: number, nRows: number, nCols: number)
     *	@param {number[]} args
     */
    private _initNumber;
    /**
     *	It handles cases:
     *	constructor(range: string)
     *	constructor(rangeStart: string, rangeEnd: string)
     *	@param {string[]} args
     */
    private _initString;
    /**
     * Constructor
     */
    constructor(object: options);
    constructor(range: string);
    constructor(rangeStart: string, rangeEnd: string);
    constructor(col: number, row: number);
    constructor(col: number, row: number, nRows: number);
    constructor(col: number, row: number, nRows: number, nCols: number);
    /***********
     * METHODS
     ***********/
    /**
     *	@return {string} in A1 notation
     */
    get(): string;
    /**
     *	@return {string} in A1 notation
     */
    toString(): string;
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
        colStart: number;
        rowStart: number;
        colEnd: number;
        rowEnd: number;
        a1: string;
        rowsCount: number;
        colsCount: number;
    };
    /**
     *	@return {number} start column
     */
    getCol(): number;
    /**
     *	@return {number} end column
     */
    getLastCol(): number;
    /**
     *	@return {number} start row
     */
    getRow(): number;
    /**
     *	@return {number} end row
     */
    getLastRow(): number;
    /**
     *	@return {number} columns count
     */
    getWidth(): number;
    /**
     *	@return {number} rows count
     */
    getHeight(): number;
    /**
     *	@return {A1} copy of this object
     */
    copy(): A1;
    /**
     * Sets a value to the start column
     * @param {string | number} val
     *
     * @returns {this}
     */
    setCol(val: string | number): this;
    /**
     * Sets a value to the end column
     * @param {string | number} val
     *
     * @returns {this}
     */
    setLastCol(val: string | number): this;
    /**
     * Sets a value to the start row
     * @param {string | number} val
     *
     * @returns {this}
     */
    setRow(val: string | number): this;
    /**
     * Sets a value to the end row
     * @param {string | number} val
     *
     * @returns {this}
     */
    setLastRow(val: string | number): this;
    /**
     *	Adds N cells to range along the x-axis
     *	if count >= 0 - adds to right
     *	if count <  0 - adds to left
     *	@param {number} count
     *
     *	@return {this}
     */
    addX(count: number): this;
    /**
     *	Adds N cells to range along the y-axis
     *	if count >= 0 - adds to bottom
     *	if count <  0 - adds to top
     *	@param {number} count
     *
     *	@return {this}
     */
    addY(count: number): this;
    /**
     *	Adds N cells to range along the x/y-axis
     *	@param {number} countX
     *	@param {number} countY
     *
     *	@return {this}
     */
    add(countX: number, countY: number): this;
    /**
     *	Removes N cells from range along the x-axis
     *	if count >= 0 - removes from right
     *	if count <  0 - removes from left
     *	@param {number} count
     *
     *	@return {this}
     */
    removeX(count: number): this;
    /**
     *	Removes N cells from range along the y-axis
     *	if count >= 0 - removes from bottom
     *	if count <  0 - removes from top
     *	@param {number} count
     *
     *	@return {this}
     */
    removeY(count: number): this;
    /**
     *	Removes N cells from range along the x/y-axis
     *	@param {number} countX
     *	@param {number} countY
     *
     *	@return {this}
     */
    remove(countX: number, countY: number): this;
    /**
     *	Shifts the range along the x-axis
     *	If offset >= 0 - shifts to right
     *	If offset <  0 - shifts to left
     *	@param {number} offset
     *
     *	@return {this}
     */
    shiftX(offset: number): this;
    /**
     *	Shifts the range along the y-axis
     *	If offset >= 0 - shifts to bottom
     *	If offset <  0 - shifts to top
     *	@param {number} offset
     *
     *	@return {this}
     */
    shiftY(offset: number): this;
    /**
     *	Shifts the range along the x/y-axis
     *	@param {number} offsetX
     *	@param {number} offsetY
     *
     *	@return {this}
     */
    shift(offsetX: number, offsetY: number): this;
    /**
     * Sets a value to the specified field
     * @param {string | number} val
     * @param {string} field
     * @param {Axis} axis
     * @param {boolean} [canBeLetter = true]
     *
     * @returns {this}
     */
    private _setFields;
    /**
     * Adds N cells to the range along the x/y-axis
     * @param {number} count
     * @param {Axis} axis
     *
     * @returns {this}
     */
    private _addFields;
    /**
     * Removes N cells from the range along the x/y-axis
     * @param {number} count
     * @param {Axis} axis
     *
     * @returns {this}
     */
    private _removeFields;
    /**
     * Shifts the specified fields along x/y-axis
     * @param {number} offset
     * @param {Axis} axis
     *
     * @returns {this}
     */
    private _shiftFields;
}
export { A1 };
export default A1;
