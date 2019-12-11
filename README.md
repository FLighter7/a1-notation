# A1 notation

### About
This library is for working with A1 notations such as "A1" or "A1:B2". The library exported as a UMD module.

### Install
```
npm i @flighter/a1-notation -d
```
Or
```
yarn add @flighter/a1-notation
```

### Download
[1]: https://raw.githubusercontent.com/FLighter7/a1-notation/master/dist/object/index.js
[2]: https://raw.githubusercontent.com/FLighter7/a1-notation/master/dist/object/index.min.js
[3]: https://raw.githubusercontent.com/FLighter7/a1-notation/master/dist/object/index.next.js
[4]: https://raw.githubusercontent.com/FLighter7/a1-notation/master/dist/object/index.next.min.js
[5]: https://raw.githubusercontent.com/FLighter7/a1-notation/master/dist/object/index.umd.js
[6]: https://raw.githubusercontent.com/FLighter7/a1-notation/master/dist/noObject/index.js
[7]: https://raw.githubusercontent.com/FLighter7/a1-notation/master/dist/noObject/index.min.js
[8]: https://raw.githubusercontent.com/FLighter7/a1-notation/master/dist/noObject/index.next.js
[9]: https://raw.githubusercontent.com/FLighter7/a1-notation/master/dist/noObject/index.next.min.js
[10]: https://raw.githubusercontent.com/FLighter7/a1-notation/master/dist/noObject/index.umd.js

With object: [ES5(76 KB)][1], [ES5.min(26 KB)][2], [ESNext(21 KB)][3], [ESNext.min(6 KB)][4], [UMD(21 KB)][5]

Without object: [ES5(68 KB)][6], [ES5.min(23 KB)][7], [ESNext(16 KB)][8], [ESNext.min(4 KB)][9], [UMD(16 KB)][10]

### What is the difference?

[11]: https://www.google.com/search?q=js+umd+is
[12]: https://github.com/FLighter7/a1-notation/blob/master/src/converters/A1-Col-1.ts
[13]: https://github.com/FLighter7/a1-notation/blob/master/src/converters/A1-Col-2.ts

* **"with object" or "without object"?** A1 constructor can take an object as an argument - it's a version "with object". So, "without object" is when a constructor can't take an object as an argument.
* **converter 1** or **converter 2**? The difference is in the algorithm of convertation. You can compare [the first method][12] with [the second method][13].
* **"ES5" or "ESNext"?** ES5 has already converted to ES5 standard with all needed polyfills. ESNext uses the original syntax of the code.
* **"UMD"?** UMD - Unified Module Definition, more in [Google][11].
* **".min"?** Minified version.
* Default version in npm is UMD ESNext "with object". This version is not transpiled and minified, so you need to transpile and minify it.

## Initialization
```js
import A1 from '@flighter/a1-notation';
// or
const A1 = require('@flighter/a1-notation');
```

## Methods

**Note:** A1 string could be represented in any register. `A1 === a1`, `A1:B2 === a1:b2 === A1:b2 === a1:B2`

*static* **isValid**
```js
// static isValid(a1: string): boolean

/**
 * Checks A1 notation.
 */

// Example
A1.isValid('A1');   // true
A1.isValid('A1:B2');// true
A1.isValid('aaaaa');// false
```

*static* **getCol**
```js
// static getCol(a1: string, converter: 1 | 2 = 1): number

/**
 * Converts the first column letter from A1 to number.
 */

// Example
A1.getCol('A1');   // 1
A1.getCol('A1:B2');// 1
A1.getCol('aaaaa');// Error
```

*static* **getLastCol**
```js
// static getLastCol(a1: string, converter: 1 | 2 = 1): number

/**
 * Converts the last column letter from A1 to number.
 */

// Example
A1.getLastCol('A1');   // 1
A1.getLastCol('A1:B2');// 2
A1.getLastCol('aaaaa');// Error
```

*static* **toCol**
```js
// static toCol(col: number): string

/**
 * Converts number to column letter in A1.
 */

// Example
A1.toCol(1);   // 'A'
A1.toCol('A1');// Error
```

*static* **getRow**
```js
// static getRow(a1: string): number

/**
 * Converts the first row string to number.
 */

// Example
A1.getRow('A1');   // 1
A1.getRow('A1:B2');// 1
A1.getRow('aaaaa');// Error
```

*static* **getLastRow**
```js
// static getLastRow(a1: string): number

/**
 * Converts the last row string to number.
 */

// Example
A1.getLastRow('A1');   // 1
A1.getLastRow('A1:B2');// 1
A1.getLastRow('aaaaa');// Error
```

*static* **toRow**
```js
// static toRow(row: number): string

/**
 * Converts number to row string in A1.
 */

// Example
A1.toRow(1);   // '1'
A1.toRow('A1');// Error
```

*static* **getWidth**
```js
// static getWidth(a1: string, converter: 1 | 2 = 1): number

/**
 * Returns columns count.
 */

// Example
A1.getWidth('A1');   // 1
A1.getWidth('A1:B2');// 2
A1.getWidth('aaaaa');// Error
```

*static* **getHeight**
```js
// static getHeight(a1: string): number

/**
 * Returns rows count.
 */

// Example
A1.getHeight('A1');   // 1
A1.getHeight('A1:B2');// 2
A1.getHeight('aaaaa');// Error
```

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

**get**
```js
// get(): string

/**
 * Returns string in A1 notation.
 */

// Example
new A1('A1').get();   // 'A1'
new A1('A1:B2').get();// 'A1:B2'
```

**toString**
```js
// toString(): string

/**
 * Returns string in A1 notation.
 */

// Example
new A1('A1').toString();   // 'A1'
new A1('A1:B2').toString();// 'A1:B2'
```

**toJSON**
```js
// toJSON(): result
/**
 * result:
 * {
 *  colStart:  number,
 *  rowStart:  number,
 *  colEnd:    number,
 *  rowEnd:    number,
 *  a1:        string,
 *  rowsCount: number,
 *  colsCount: number,
 * }
 */

/**
 * Returns a full information about range.
 */

// Example
new A1('A1').toJSON();
/**
 * {
 *  colStart:  1,
 *  rowStart:  1,
 *  colEnd:    1,
 *  rowEnd:    1,
 *  a1:        'A1',
 *  rowsCount: 1,
 *  colsCount: 1,
 * }
 */
new A1('A1:B2').toJSON();
/**
 * {
 *  colStart:  1,
 *  rowStart:  1,
 *  colEnd:    2,
 *  rowEnd:    2,
 *  a1:        'A1:B2',
 *  rowsCount: 2,
 *  colsCount: 2,
 * }
 */
```

**getCol**
```js
// getCol(): number

/**
 * Returns the first column.
 */

// Example
new A1('A1').getCol();   // 1
new A1('A1:B2').getCol();// 1
```

**getLastCol**
```js
// getLastCol(): number

/**
 * Returns the last column.
 */

// Example
new A1('A1').getLastCol();   // 1
new A1('A1:B2').getLastCol();// 2
```

**getRow**
```js
// getRow(): number

/**
 * Returns the first row.
 */

// Example
new A1('A1').getRow();   // 1
new A1('A1:B2').getRow();// 1
```

**getLastRow**
```js
// getLastRow(): number

/**
 * Returns the last row.
 */

// Example
new A1('A1').getLastRow();   // 1
new A1('A1:B2').getLastRow();// 2
```

**getWidth**
```js
// getWidth(): number

/**
 * Returns columns count.
 */

// Example
new A1('A1').getWidth();   // 1
new A1('A1:B2').getWidth();// 2
```

**getHeight**
```js
// getHeight(): number

/**
 * Returns rows count.
 */

// Example
new A1('A1').getHeight();   // 1
new A1('A1:B2').getHeight();// 2
```

**copy**
```js
// copy(): A1

/**
 * Returns a copy of this object.
 */

// Example
new A1('A1').copy();   // instance of A1
new A1('A1:B2').copy();// instance of A1
```

**addX**
```js
// addX(count: number): this

/**
 * Adds N cells to range along the x-axis.
 * if count >= 0 - adds to right.
 * if count <  0 - adds to left.
 */
/*
               +---+---+---+
               | 1 | 2 | 3 |
   count < 0   +---+---+---+   count >= 0
<------------- | 4 | 5 | 6 | ------------->
               +---+---+---+
               | 7 | 8 | 9 |
               +---+---+---+
 */

// Example
new A1('A1').addX(1);    // A1:B1
new A1('A1:B2').addX(-1);// A1:B2
new A1('C1:E1').addX(-1);// B1:E1
```

**addY**
```js
// addY(count: number): this

/**
 * Adds N cells to range along the y-axis.
 * if count >= 0 - adds to bottom.
 * if count <  0 - adds to top.
 */
/*
                     ^
                     | count < 0
                     |
               +---+---+---+
               | 1 | 2 | 3 |
               +---+---+---+
               | 4 | 5 | 6 |
               +---+---+---+
               | 7 | 8 | 9 |
               +---+---+---+
                     |
                     | count >= 0
                     ˅
 */

// Example
new A1('A1').addY(1);    // A1:A2
new A1('A1:B2').addY(-1);// A1:B2
new A1('A3:B4').addY(-1);// A2:B4
```

**add**
```js
// add(countX: number, countY: number): this

/**
 * Adds N cells to range along the x/y-axis.
 */

// Example
new A1('A1').add(1, 1);     // A1:B2
new A1('A1:B2').add(-1, -1);// A1:B2
new A1('A3:B4').add(-1, -1);// A2:B4
new A1('C3:E5').add(-1, -1);// B2:E5
new A1('C3:E5').add(-1, 1); // B3:E6
new A1('C3:E5').add(1, -1); // C2:F5
```

**removeX**
```js
// removeX(count: number): this

/**
 * Removes N cells from range along the x-axis.
 * if count >= 0 - removes from right.
 * if count <  0 - removes from left.
 */
/*
               +---+---+---+
               | 1 | 2 | 3 |
   count < 0   +---+---+---+   count >= 0
-------------> | 4 | 5 | 6 | <-------------
               +---+---+---+
               | 7 | 8 | 9 |
               +---+---+---+
 */

// Example
new A1('A1').removeX(1);    // A1:A1
new A1('A1:B2').removeX(-1);// B1:B2
new A1('B3:C4').removeX(-1);// C3:C4
```

**removeY**
```js
// removeY(count: number): this

/**
 * Removes N cells from range along the y-axis.
 * if count >= 0 - removes from bottom.
 * if count <  0 - removes from top.
 */
/*
                     |
                     | count < 0
                     ˅
               +---+---+---+
               | 1 | 2 | 3 |
               +---+---+---+
               | 4 | 5 | 6 |
               +---+---+---+
               | 7 | 8 | 9 |
               +---+---+---+
                     ^
                     | count >= 0
                     |
 */

// Example
new A1('A1').removeY(1);    // A1:A1
new A1('A1:B2').removeY(-1);// A2:B2
new A1('B3:C4').removeY(-1);// B4:C4
```

**remove**
```js
// remove(countX: number, countY: number): this

/**
 * Removes N cells from range along the x/y-axis.
 */

// Example
new A1('A1').remove(1, 1);     // A1:A1
new A1('A1:B2').remove(-1, -1);// B2:B2
new A1('A3:B4').remove(-1, -1);// B4:B4
new A1('C3:E5').remove(-1, -1);// D4:E5
new A1('C3:E5').remove(-1, 1); // D3:E4
new A1('C3:E5').remove(1, -1); // C4:D5
```

**shiftX**
```js
// shiftX(offset: number): this

/**
 * Shifts the range along the x-axis.
 * If offset >= 0 - shifts to right.
 * If offset <  0 - shifts to left.
 */
/*
               +---+---+---+
 <------------ | 1 | 2 | 3 | ------------>
               +---+---+---+
   offset < 0  | 4 | 5 | 6 |  offset >= 0
               +---+---+---+
 <------------ | 7 | 8 | 9 | ------------>
               +---+---+---+
 */

// Example
new A1('A1').shiftX(1);    // B1:B1
new A1('A1:B2').shiftX(-1);// A1:B2
new A1('B3:C4').shiftX(-1);// A3:B4
```

**shiftY**
```js
// shiftY(offset: number): this

/**
 * Shifts the range along the y-axis.
 * If offset >= 0 - shifts to bottom.
 * If offset <  0 - shifts to top.
 */
/*
                 ^       ^
    offset < 0   |       |
                 |       |
               +---+---+---+
               | 1 | 2 | 3 |
               +---+---+---+
               | 4 | 5 | 6 |
               +---+---+---+
               | 7 | 8 | 9 |
               +---+---+---+
                 |       |
    offset >= 0  |       |
                 ˅       ˅
 */

// Example
new A1('A1').shiftY(1);    // A2:A2
new A1('A1:B2').shiftY(-1);// A1:B2
new A1('B3:C4').shiftY(-1);// B2:C3
```

**shift**
```js
// shift(offsetX: number, offsetY: number): this

/**
 * Shifts the range along the x/y-axis.
 */

// Example
new A1('A1').shift(1, 1);     // B2:B2
new A1('A1:B2').shift(-1, -1);// A1:B2
new A1('A3:B4').shift(-1, -1);// A2:B3
new A1('C3:E5').shift(-1, -1);// B2:D4
new A1('C3:E5').shift(-1, 1); // B4:D6
new A1('C3:E5').shift(1, -1); // D2:F4
```
