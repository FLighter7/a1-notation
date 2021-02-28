**setCol**
```js
// setCol(val: string | number): this

/**
 * Sets a value to the start column
 */

// Example
new A1('B2:C4').setCol(1);  // A2:C4
new A1('B2:C4').setCol('1');// A2:C4
new A1('B2:C4').setCol('A');// A2:C4
```

**setLastCol**
```js
// setLastCol(val: string | number): this

/**
 * Sets a value to the end column
 */

// Example
new A1('B2:C4').setLastCol(6);  // B2:F4
new A1('B2:C4').setLastCol('6');// B2:F4
new A1('B2:C4').setLastCol('F');// B2:F4
```

**setRow**
```js
// setRow(val: string | number): this

/**
 * Sets a value to the start row
 */

// Example
new A1('B2:C4').setRow(3);  // B3:C4
new A1('B2:C4').setRow('3');// B3:C4
```

**setLastRow**
```js
// setLastRow(val: string | number): this

/**
 * Sets a value to the end row
 */

// Example
new A1('B2:C4').setLastRow(7);  // B2:C7
new A1('B2:C4').setLastRow('7');// B2:C7
```
