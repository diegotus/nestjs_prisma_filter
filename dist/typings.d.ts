declare enum EmptyEnum {
    null = 0,
    notNul = 1
}
declare enum Sort {
    null = 0,
    notNul = 1
}
export interface FilterArgs {
    columns?: Columns[];
    dateRange?: DateRangeOptions;
    or: Columns[];
    and: Columns[];
}
export interface DateRangeOptions {
    from?: string;
    to?: string;
    name: string;
}
export interface Columns {
    name: string;
    search?: EmptyEnum | string |  number| boolean | string[] | number[] | boolean[];
    orderBy?: Sort;
}
export declare function isEmptyEnum(value: string): boolean;
export {};
