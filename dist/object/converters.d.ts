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
export declare const colStringToNumber1: (col: string) => number;
/**
 * Converts column letter to number
 * @author Flambino
 * @see https://codereview.stackexchange.com/questions/90112/a1notation-conversion-to-row-column-index
 * @param {string} col
 *
 * @returns {number}
 */
export declare const colStringToNumber2: (col: string) => number;
/**
 * Converts column number to letter
 * @author AdamL
 * @see https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
 * @param {number} col
 *
 * @returns {string}
 */
export declare const colNumberToString: (col: number) => string;
/**
 * Converts row string to number
 * @param {string} row
 *
 * @returns {number}
 */
export declare const rowStringToNumber: (row: string) => number;
/**
 * Converts row number to string
 * @param {number} row
 *
 * @returns {string}
 */
export declare const rowNumberToString: (row: number) => string;
