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
