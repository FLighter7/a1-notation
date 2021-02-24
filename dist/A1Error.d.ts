/**
 *	@fileOverview A1 notation errors
 */
export default class A1Error<T> extends Error {
    constructor(a1: string);
    constructor(col: number);
    constructor(row: number);
    constructor(unknown?: T);
    wasString(): A1Error<T>;
    wasNumber(): A1Error<T>;
    wasUnknown(): A1Error<T>;
}
