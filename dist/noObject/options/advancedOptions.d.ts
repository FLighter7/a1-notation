import options from './options';
declare type advancedOption = {
    readonly isString: boolean;
    readonly isNumber: boolean;
    readonly val: string | number;
};
declare type advancedOptions = {
    [key in keyof options]: advancedOption;
};
export default advancedOptions;
