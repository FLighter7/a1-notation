**constructor**
```js
// constructor(object: options) - in version "with object"
// constructor(range: string)
// constructor(rangeStart: string, rangeEnd: string)
// constructor(col: number, row: number)
// constructor(col: number, row: number, nRows: number)
// constructor(col: number, row: number, nRows: number, nCols: number)

/**
 * options:
 * {
 *  colStart?:  string | number,
 *  rowStart?:  string | number,
 *  colEnd?:    string | number,
 *  rowEnd?:    string | number,
 *  a1Start?:   string,
 *  a1End?:     string,
 *  nCols?:     number,// how many cols in total (cols length)
 *  nRows?:     number,// how many rows in total (rows length)
 *  converter?: 1 | 2,
 * }
 */

// Example (supported now):
new A1('A1');       // A1:A1
new A1('A1:B2');    // A1:B2
new A1('A1', 'B2'); // A1:B2
new A1(1, 1);       // A1:A1
new A1(1, 1, 2);    // A1:A2
new A1(1, 1, 2, 2); // A1:B2
// A1:A1
new A1({
  a1Start:  'A1',
});
// A1:B2
new A1({
  a1Start:  'A1', a1End:   'B2',
});
// A1:A1
new A1({
  colStart: 'A', rowStart: '1',
});
// A1:A1
new A1({
  colStart:  1,  rowStart:  1,
});
// A1:A2
new A1({
  colStart:  1,  rowStart:  1,  nRows:   2,
});
// A1:B1
new A1({
  colStart:  1,  rowStart:  1,  nCols:   2,
});
// A1:B2
new A1({
  colStart:  1,  rowStart:  1,  nRows:   2,  nCols:   2,
});
// A1:B1
new A1({
  colStart: 'A', rowStart: '1', colEnd: 'B',
});
// A1:B1
new A1({
  colStart:  1,  rowStart:  1,  colEnd:  2,
});
// A1:A2
new A1({
  colStart: 'A', rowStart: '1', rowEnd: '2',
});
// A1:A2
new A1({
  colStart:  1,  rowStart:  1,  rowEnd:  2,
});
// A1:B2
new A1({
  colStart: 'A', rowStart: '1', colEnd: 'B', rowEnd: '2',
});
// A1:B2
new A1({
  colStart:  1,  rowStart:  1,  colEnd:  2,  rowEnd:  2,
});
```
