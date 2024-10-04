import {assert} from 'chai';
import {dynamic} from '../_values.js';

const {strictEqual} = assert;
const equal = strictEqual;
const {
  input,
} = dynamic;

const testMmethod = 'setRow',
      resultMethod = 'getRow';
const valNumber = 2,
      valStrNumber = '2';

export default (A1) =>
{
  // Input number
  describe(`new A1('${input}').${testMmethod}(${valNumber}) // Positive tests only`, () =>
  {
    describe('Must be a valid number:', () =>
    {
      it(
        `${valNumber} set = ${valNumber} get`,
        () => equal(new A1(input)[testMmethod](valNumber)[resultMethod](), valNumber)
      );
    });
  });

  // Input stringified number
  describe(`new A1('${input}').${testMmethod}("${valStrNumber}") // Positive tests only`, () =>
  {
    describe('Must be a valid number:', () =>
    {
      it(
        `"${valStrNumber}" set = ${valNumber} get`,
        () => equal(new A1(input)[testMmethod](valStrNumber)[resultMethod](), valNumber)
      );
    });
  });
}
