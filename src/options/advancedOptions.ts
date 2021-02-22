import options from './options';

type advancedOption =
{
	readonly isString: 	boolean,
	readonly isNumber: 	boolean,
	readonly val: 		string | number,
}

type advancedOptions =
{
	[key in keyof options]: advancedOption
}

export default advancedOptions;
