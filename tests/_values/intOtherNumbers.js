/**
 *	Integer numbers
 *	<= 0
 */
const intOtherNumbers =
[
  {
    text: '0',
    value: 0,
    expectedError: /^Invalid A1 .+: .+$/,
  },
  {
    text: '-1',
    value: -1,
    expectedError: /^Invalid A1 .+: .+$/,
  },
  {
    text: '-10',
    value: -10,
    expectedError: /^Invalid A1 .+: .+$/,
  },
  {
    text: '-100',
    value: -100,
    expectedError: /^Invalid A1 .+: .+$/,
  },
];

module.exports = intOtherNumbers;
