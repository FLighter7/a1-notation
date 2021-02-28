/**
 * @file Contains secondary functions
 */

/**
 * Returns the type of a value
 * @param {unknown} some
 *
 * @returns {string}
 */
export const type = (some: unknown): string => typeof some;

/**
 * Checks if a value is a string
 * @param {unknown} some
 *
 * @returns {boolean}
 */
export const isString = (some: unknown): boolean => type(some) === 'string';

/**
 * Checks if a value is a number
 * @param {unknown} some
 *
 * @returns {boolean}
 */
export const isNumber = (some: unknown): boolean => type(some) === 'number' && Number.isInteger(some);

/**
 * Checks if a value is a positive number
 * @param {unknown} some
 *
 * @returns {boolean}
 */
export const isPositiveNumber = (some: unknown): boolean => isNumber(some) && some > 0;

/**
 * Checks if a value is a stringified number > 0 like "1", "2", ...
 * @param {unknown} some
 *
 * @returns {boolean}
 */
export const isStringifiedNumber = (some: unknown): boolean => isString(some) && /^[0-9]+$/.test(some as string) && isPositiveNumber(+some);

/**
 * Checks if a value is a letter between a-zA-Z
 * @param {unknown} some
 *
 * @returns {boolean}
 */
export const isLetter = (some: unknown): boolean => isString(some) && /^[a-z]+$/i.test(some as string);

/**
 * Checks validation of A1 notation
 * @param {unknown} some
 *
 * @returns {boolean}
 */
export const isValidA1 = (some: unknown): boolean => isString(some) && /^[A-Z]+\d+(:[A-Z]+\d+)?$/i.test(some as string);
