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
[1]: dist/index.js
[2]: dist/index.min.js
[3]: dist/index.next.js
[4]: dist/index.next.min.js
[5]: dist/index.umd.js

[ES5(81 KB)][1], [ES5.min(26 KB)][2], [ESNext(22 KB)][3], [ESNext.min(5 KB)][4], [UMD(22 KB)][5]

### What is the difference?

[11]: https://www.google.com/search?q=js+umd+is
[12]: src/converters.ts#L13
[13]: src/converters.ts#L30

* **converter 1** or **converter 2**? The difference is in the algorithm of convertation. You can compare [the first method][12] with [the second method][13].
* **"ES5" or "ESNext"?** ES5 has already converted to ES5 standard with all needed polyfills. ESNext uses the original syntax of the code.
* **"UMD"?** UMD - Unified Module Definition, more in [Google][11].
* **".min"?** Minified version.
* **Default version** in npm is UMD ESNext. This version is not transpiled and minified, so you need to transpile and minify it.

## Initialization
```js
import A1 from '@flighter/a1-notation';
// or
const A1 = require('@flighter/a1-notation');
```

## API

**Note:** A1 string could be represented in any register. `A1 === a1`, `A1:B2 === a1:b2 === A1:b2 === a1:B2`

- [static isValid(a1: string): boolean](docs/method-static-isValid.md)
- [static getCol(a1: string, converter: 1 | 2 = 1): number](docs/method-static-get.md)
- [static getLastCol(a1: string, converter: 1 | 2 = 1): number](docs/method-static-get.md)
- [static getRow(a1: string): number](docs/method-static-get.md)
- [static getLastRow(a1: string): number](docs/method-static-get.md)
- [static getWidth(a1: string, converter: 1 | 2 = 1): number](docs/method-static-get.md)
- [static getHeight(a1: string): number](docs/method-static-get.md)
- [static toCol(col: number): string](docs/method-static-to.md)
- [static toRow(row: number): string](docs/method-static-to.md)
- [constructor](docs/constructor.md)
- [get(): string](docs/method-get.md)
- [toString(): string](docs/method-get.md)
- [toJSON(): result](docs/method-get.md)
- [getCol(): number](docs/method-get.md)
- [getLastCol(): number](docs/method-get.md)
- [getRow(): number](docs/method-get.md)
- [getLastRow(): number](docs/method-get.md)
- [getWidth(): number](docs/method-get.md)
- [getHeight(): number](docs/method-get.md)
- [setCol(val: string | number): this](docs/method-set.md)
- [setLastCol(val: string | number): this](docs/method-set.md)
- [setRow(val: string | number): this](docs/method-set.md)
- [setLastRow(val: string | number): this](docs/method-set.md)
- [copy(): A1](docs/method-copy.md)
- [addX(count: number): this](docs/method-add.md)
- [addY(count: number): this](docs/method-add.md)
- [add(countX: number, countY: number): this](docs/method-add.md)
- [removeX(count: number): this](docs/method-remove.md)
- [removeY(count: number): this](docs/method-remove.md)
- [remove(countX: number, countY: number): this](docs/method-remove.md)
- [shiftX(offset: number): this](docs/method-shift.md#shiftx)
- [shiftY(offset: number): this](docs/method-shift.md#shifty)
- [shift(offsetX: number, offsetY: number): this](docs/method-shift.md#shift)
