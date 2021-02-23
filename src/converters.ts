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
export const colStringToNumber1 = (col: string): number =>
{
  const length = col.length;
  let column = 0;
  for(let i = 0; i < length; i++)
    column += (col.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  return column;
}

/**
 * Converts column letter to number
 * @author Flambino
 * @see https://codereview.stackexchange.com/questions/90112/a1notation-conversion-to-row-column-index
 * @param {string} col
 *
 * @returns {number}
 */
export const colStringToNumber2 = (col: string): number =>
{
  let i,
      l,
      chr,
      sum   = 0,
      A     = 'A'.charCodeAt(0),
      radix = 'Z'.charCodeAt(0) - A + 1;
  for(i = 0, l = col.length; i < l; i++)
  {
    chr = col.charCodeAt(i);
    sum = sum * radix + chr - A + 1;
  }
  return sum;
}

/**
 * Converts column number to letter
 * @author AdamL
 * @see https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
 * @param {number} col
 *
 * @returns {string}
 */
export const colNumberToString = (col: number): string =>
{
  let letter = '',
      temp;
  while(col > 0)
  {
    temp   = (col - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    col    = (col - temp - 1) / 26;
  }
  return letter;
}

/**
 * Converts row string to number
 * @param {string} row
 *
 * @returns {number}
 */
export const rowStringToNumber = (row: string): number => parseInt(row, 10);

/**
 * Converts row number to string
 * @param {number} row
 *
 * @returns {string}
 */
export const rowNumberToString = (row: number): string => row.toString();
