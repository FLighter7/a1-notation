# A1 notation

### About

This library is for working with A1 notations such as "A1" or "A1:B2". It's published for both ESM (`import`) and CommonJS (`require`), so it works on new and old Node alike.

### Install

```
npm i @flighter/a1-notation -d
```

Or

```
yarn add @flighter/a1-notation
```

### Download

[4]: dist/index.global.iife.js
[5]: dist/index.mjs
[6]: dist/index.cjs

[Browser IIFE, minified (5 KB)][4], [ESM][5], [CommonJS][6]

### What is the difference?

[12]: src/converters.ts#L13
[13]: src/converters.ts#L30

- **converter 1** or **converter 2**? The difference is in the algorithm of convertation. You can compare [the first method][12] with [the second method][13].
- **Browser IIFE?** Minified bundle for a direct `<script>` tag (exposes a global `A1`).
- **ESM/CommonJS?** Both are the same code, published untranspiled/unminified so your own bundler can process them; `import`/`require` resolve to the right one automatically via `package.json#exports`.

## Initialization

```js
// ESM
import A1 from '@flighter/a1-notation';
```

```js
// CommonJS
const A1 = require('@flighter/a1-notation');
```

## API

**Note:** A1 string could be represented in any register. `A1 === a1`, `A1:B2 === a1:b2 === A1:b2 === a1:B2`

- [static isValid(a1: string): boolean](docs/method-static-isValid.md#isvalid)
- [static getCol(a1: string, converter: 1 | 2 = 1): number](docs/method-static-get.md#getcol)
- [static getLastCol(a1: string, converter: 1 | 2 = 1): number](docs/method-static-get.md#getlastcol)
- [static getRow(a1: string): number](docs/method-static-get.md#getrow)
- [static getLastRow(a1: string): number](docs/method-static-get.md#getlastrow)
- [static getWidth(a1: string, converter: 1 | 2 = 1): number](docs/method-static-get.md#getwidth)
- [static getHeight(a1: string): number](docs/method-static-get.md#getheight)
- [static toCol(col: number): string](docs/method-static-to.md#tocol)
- [static toRow(row: number): string](docs/method-static-to.md#torow)
- [constructor](docs/constructor.md#constructor)
- [get(): string](docs/method-get.md#get)
- [toString(): string](docs/method-get.md#tostring)
- [toJSON(): result](docs/method-get.md#tojson)
- [getCol(): number](docs/method-get.md#getcol)
- [getLastCol(): number](docs/method-get.md#getlastcol)
- [getRow(): number](docs/method-get.md#getrow)
- [getLastRow(): number](docs/method-get.md#getlastrow)
- [getWidth(): number](docs/method-get.md#getwidth)
- [getHeight(): number](docs/method-get.md#getheight)
- [setCol(val: string | number): this](docs/method-set.md#setcol)
- [setLastCol(val: string | number): this](docs/method-set.md#setlastcol)
- [setRow(val: string | number): this](docs/method-set.md#setrow)
- [setLastRow(val: string | number): this](docs/method-set.md#setlastrow)
- [copy(): A1](docs/method-copy.md#copy)
- [addX(count: number): this](docs/method-add.md#addx)
- [addY(count: number): this](docs/method-add.md#addy)
- [add(countX: number, countY: number): this](docs/method-add.md#add)
- [removeX(count: number): this](docs/method-remove.md#removex)
- [removeY(count: number): this](docs/method-remove.md#removey)
- [remove(countX: number, countY: number): this](docs/method-remove.md#remove)
- [shiftX(offset: number): this](docs/method-shift.md#shiftx)
- [shiftY(offset: number): this](docs/method-shift.md#shifty)
- [shift(offsetX: number, offsetY: number): this](docs/method-shift.md#shift)

## License

[MIT](LICENSE)

## Changelog

[The latest updates](CHANGELOG.md)
