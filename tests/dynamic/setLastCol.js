const chai      = require('chai'),
      equal     = chai.assert.strictEqual,
      {dynamic} = require('../_values.js');

const {
  input,
} = dynamic;

const testMmethod = 'setLastCol',
      resultMethod = 'getLastCol';
const valNumber = 4,
      valStrNumber = '4',
      valString = 'D';

module.exports = (A1) =>
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

  // Input string
  describe(`new A1('${input}').${testMmethod}("${valString}") // Positive tests only`, () =>
  {
    describe('Must be a valid number:', () =>
    {
      it(
        `"${valString}" set = ${valNumber} get`,
        () => equal(new A1(input)[testMmethod](valString)[resultMethod](), valNumber)
      );
    });
  });
}
