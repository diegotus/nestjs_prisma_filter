import { Columns, FilterArgs, isEmptyEnum, PrismaFilterData } from "./typings";
import {
  has,
  isArray,
  isEmpty,
  isNumber,
  isString,
  merge,
  pick,
  reduce,
  set,
} from "lodash";

export function handleSearchData(filter: FilterArgs): PrismaFilterData {
  let data: PrismaFilterData = {
    where: {},
    skip:filter.skip,
    take:filter.take
  };

  if (filter.columns) {
    setColumns(filter.columns, data.where);
  }
  if (filter.or || filter.and) {
    merge(
      data.where,
      reduce(
        pick(filter, ["or", "and"]),
        (result: Record<string, any[]>, current, index: string) => {
          const value = {};
          setColumns(current, value);
          if (!isEmpty(value)) {
            const key = index.toUpperCase();
            if (!has(result, key)) set(result, key, []);
            result[key].push(value);
          }

          return result;
        },
        {}
      )
    );
  }
  if (filter.dateRange) {
    const { from, to, name } = filter.dateRange;
    if (from) {
      set(
        data.where,
        name + ".gte",
        new Date(new Date(from).setHours(0, 0, 0, 0))
      );
    }
    if (to) {
      set(
        data.where,
        name + ".lte",
        new Date(new Date(to).setHours(23, 59, 59, 999))
      );
    }
  }
  return data;
}
function setColumns(columns: Columns[], where: Record<string, any>) {
  if (columns) {
    for (const col of columns) {
      //seting search
      if (col.search) {
        set(where, col.name, setSearch(col.search));
      }
    }
  }
}
function setSearch(search: string | string[] | number | number[]) {
  if (isArray(search)) {
    return reduce<string | number, Record<string, any>>(
      search,
      (result: Record<string, any>, val: string | number, index: number) => {
        set(result, `in[${index}]`, getEmptyEnum(val));
        return result;
      },
      {}
    );
  } else return getEmptyEnum(search);
}
function getEmptyEnum(search: string | number): any {
  if (isString(search) && isEmptyEnum(search)) {
    return search == "null" ? { is: null } : { not: null };
  }
  return search;
}
