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

export function isEmptyEnum(value: string): boolean {
  return Object.values(EmptyEnum).includes(value);
}

export interface PrismaFilterData {
  where:  Record<string, any>;
  skip?: number;
  take?: number;
}
