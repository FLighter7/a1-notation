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
