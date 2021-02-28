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

[static isValid(a1: string): boolean](docs/method-static-isValid.md)
[static getCol(a1: string, converter: 1 | 2 = 1): number](docs/method-static-get.md)
[static getLastCol(a1: string, converter: 1 | 2 = 1): number](docs/method-static-get.md)
[static getRow(a1: string): number](docs/method-static-get.md)
[static getLastRow(a1: string): number](docs/method-static-get.md)
[static getWidth(a1: string, converter: 1 | 2 = 1): number](docs/method-static-get.md)
[static getHeight(a1: string): number](docs/method-static-get.md)
