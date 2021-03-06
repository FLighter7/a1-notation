/**
 * @fileOverview A1 notation errors
 */
export default class A1Error<T> extends Error
{
	constructor(a1: string)
	constructor(col: number)
	constructor(row: number)
	constructor(unknown?: T)
	constructor(something?: string | number | T)
	{
		const str = JSON.stringify(something);
		super(str);
		this.name 		= 'A1Error';
		this.message 	= str;
	}

  /**
   * Was string
   */
	s(): A1Error<T>
	{
		this.message = `Invalid A1 notation: ${this.message}`;
		return this;
	}

  /**
   * Was number
   */
	n(): A1Error<T>
	{
		this.message = `Invalid A1 number(s): ${this.message}`;
		return this;
	}

  /**
   * Was unknown
   */
	u(): A1Error<T>
	{
		this.message = `Invalid A1 argument(s): ${this.message}`;
		return this;
	}
}
