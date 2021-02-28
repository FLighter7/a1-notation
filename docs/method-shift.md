### shiftX
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

### shiftY
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

### shift
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
