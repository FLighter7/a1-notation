/**
 *	@fileOverview A1 notation errors
 */
export default class A1Error<T> extends Error
{
	constructor(a1: string)
	constructor(col: number)
	constructor(row: number)
	constructor(unknown?: T)
	constructor(something?: string | number | T)
	{
		let str = JSON.stringify(something);
		super(str);
		this.name 		= 'A1Error';
		this.message 	= str;
	}

	wasString(): A1Error<T>
	{
		this.message = `Invalid A1 notation: ${this.message}`;
		return this;
	}

	wasNumber(): A1Error<T>
	{
		this.message = `Invalid A1 number(s): ${this.message}`;
		return this;
	}

	wasUnknown(): A1Error<T>
	{
		this.message = `Invalid A1 argument(s): ${this.message}`;
		return this;
	}
}
