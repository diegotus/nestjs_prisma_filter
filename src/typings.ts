enum EmptyEnum {
  null,
  notNul,
}
enum Sort {
  null,
  notNul,
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
  search?: EmptyEnum | string | string[] | number | number[];
  orderBy?: Sort;
}

export function isEmptyEnum(value: string): boolean {
  return Object.values(EmptyEnum).includes(value);
}
