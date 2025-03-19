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
    take?: number;
    skip?: number;
}
export interface DateRangeOptions {
    from?: string;
    to?: string;
    name: string;
}
export interface Columns {
    name: string;
    search?: EmptyEnum | string | string[] | number | number[];
    orderBy?: Sort;
}
export declare function isEmptyEnum(value: string): boolean;
export interface PrismaFilterData {
    where: Record<string, any>;
    skip?: number;
    take?: number;
}
export {};
