### constructor

A1 constructor takes such arguments as below:
```js
constructor(object: options)
constructor(range: string)
constructor(rangeStart: string, rangeEnd: string)
constructor(col: number, row: number)
constructor(col: number, row: number, nRows: number)
constructor(col: number, row: number, nRows: number, nCols: number)
```
Where `options` is:
```js
options =
{
  colStart?:  string | number,// "A" | "1" | 1
  rowStart?:  string | number,// "1" | 1
  colEnd?:    string | number,// "B" | "2" | 2
  rowEnd?:    string | number,// "2" | 2
  a1Start?:   string,         // "A1:B2" | "A1"
  a1End?:     string,         // "B2"
  nCols?:     number,         // how many cols in total (cols length)
  nRows?:     number,         // how many rows in total (rows length)
  converter?: 1 | 2,
}
```

#### Options priorities

Options priorities consist of two parts, where (e.g. for the range "A1:B2") the first part is "A1" and the second is "B2". For the first part priorities are: `a1Start -> colStart -> rowStart -> column or/and row from the second part, it they were not provided`. For the second part priorities are: `a1Start -> a1End -> colEnd -> rowEnd -> nCols -> nRows -> column or/and row from the first part, it they were not provided`.

**Warning:** `{a1Start: "A1:A1", a1End: "B2"} -> A1:A1`, because ":" is provided.

**Note:** If the constructor can't define any of column/row start/end values, an error will be thrown

#### Examples

```js
new A1('A1');       // A1:A1
new A1('A1:B2');    // A1:B2
new A1('A1', 'B2'); // A1:B2
new A1(1, 1);       // A1:A1
new A1(1, 1, 2);    // A1:A2
new A1(1, 1, 2, 2); // A1:B2

// A1:A1
new A1({a1Start: 'A1'});

// A1:B2
new A1({a1Start: 'A1', a1End: 'B2'});

// A1:A1
new A1({colStart: 'A', rowStart: '1'});

// A1:A1
new A1({colStart: 1, rowStart: 1});

// A1:A2
new A1({colStart: 1, rowStart: 1, nRows: 2});

// A1:B1
new A1({colStart: 1, rowStart: 1, nCols: 2});

// A1:B2
new A1({colStart: 1, rowStart: 1, nRows: 2, nCols: 2});

// A1:B1
new A1({colStart: 'A', rowStart: '1', colEnd: 'B'});

// A1:B1
new A1({colStart: 1, rowStart: 1, colEnd: 2});

// A1:A2
new A1({colStart: 'A', rowStart: '1', rowEnd: '2'});

// A1:A2
new A1({colStart: 1, rowStart: 1, rowEnd: 2});

// A1:B2
new A1({colStart: 'A', rowStart: '1', colEnd: 'B', rowEnd: '2'});

// A1:B2
new A1({colStart: 1, rowStart: 1, colEnd: 2, rowEnd: 2});
```
