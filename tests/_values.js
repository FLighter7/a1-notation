import alwaysInvalid from './_values/alwaysInvalid.js';
import alwaysA1Valid from './_values/alwaysA1Valid.js';
import intPositiveNumbers from './_values/intPositiveNumbers.js';
import intOtherNumbers from './_values/intOtherNumbers.js';

export * from './_values/validObjects.js';

// Input must be "string"
export const a1Valid = alwaysA1Valid;
export const a1Invalid = [...alwaysInvalid, ...intPositiveNumbers, ...intOtherNumbers];
// Input must be "number" > 0
export const intPositiveValid = intPositiveNumbers;
export const intPositiveInvalid = [...alwaysInvalid, ...intOtherNumbers, ...alwaysA1Valid];
// Input must be "number"
export const intAllValid = [...intPositiveNumbers, ...intOtherNumbers];
export const intAllInvalid = [...alwaysInvalid, ...alwaysA1Valid];
// For "dynamic" tests
export const dynamic = {
  input:    'A3:B4',
  colStart: 1,
  rowStart: 3,
  colEnd:   2,
  rowEnd:   4,
  width:    2,
  height:   2,
};
