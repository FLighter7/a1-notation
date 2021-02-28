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
