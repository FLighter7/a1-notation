/**
 * @fileOverview A1 notation errors
 */
export default class A1Error<T> extends Error {
    constructor(a1: string);
    constructor(col: number);
    constructor(row: number);
    constructor(unknown?: T);
    /**
     * Was string
     */
    s(): A1Error<T>;
    /**
     * Was number
     */
    n(): A1Error<T>;
    /**
     * Was unknown
     */
    u(): A1Error<T>;
}
