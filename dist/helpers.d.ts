/**
 * @file Contains secondary functions
 */
/**
 * Returns the type of a value
 * @param {unknown} some
 *
 * @returns {string}
 */
export declare const type: (some: unknown) => string;
/**
 * Checks if a value is a string
 * @param {unknown} some
 *
 * @returns {boolean}
 */
export declare const isString: (some: unknown) => some is string;
/**
 * Checks if a value is a number
 * @param {unknown} some
 *
 * @returns {boolean}
 */
export declare const isNumber: (some: unknown) => some is number;
/**
 * Checks if a value is a positive number
 * @param {unknown} some
 *
 * @returns {boolean}
 */
export declare const isPositiveNumber: (some: unknown) => some is number;
/**
 * Checks if a value is a stringified number > 0 like "1", "2", ...
 * @param {unknown} some
 *
 * @returns {boolean}
 */
export declare const isStringifiedNumber: (some: unknown) => some is string;
/**
 * Checks if a value is a letter between a-zA-Z
 * @param {unknown} some
 *
 * @returns {boolean}
 */
export declare const isLetter: (some: unknown) => some is string;
/**
 * Checks validation of A1 notation
 * @param {unknown} some
 *
 * @returns {boolean}
 */
export declare const isValidA1: (some: unknown) => some is string;
