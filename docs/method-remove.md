### removeX
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

### removeY
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

### remove
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
