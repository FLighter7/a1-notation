/**
 *	Integer positive numbers
 *	> 0
 */
export const intPositiveNumbers =
[
  {
    text: '1',
    value: 1,
    a1Col: 'A',
    a1Row: '1',
    expectedError: /^Invalid A1 .+: .+$/,
  },
  {
    text: '26',
    value: 26,
    a1Col: 'Z',
    a1Row: '26',
    expectedError: /^Invalid A1 .+: .+$/,
  },
  {
    text: '27',
    value: 27,
    a1Col: 'AA',
    a1Row: '27',
    expectedError: /^Invalid A1 .+: .+$/,
  },
  {
    text: '50',
    value: 50,
    a1Col: 'AX',
    a1Row: '50',
    expectedError: /^Invalid A1 .+: .+$/,
  },
  {
    text: '100',
    value: 100,
    a1Col: 'CV',
    a1Row: '100',
    expectedError: /^Invalid A1 .+: .+$/,
  },
];

export default intPositiveNumbers;
