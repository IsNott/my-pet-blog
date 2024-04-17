import dayjs from "dayjs";
import { Query, SQLType, Expression } from "./dataDefinition";
import { error } from "console";
import { boolean } from "zod";

const getRandomColor = (tagsColors: string[]): any => {
  const randomIndex = Math.floor(Math.random() * tagsColors.length);
  return tagsColors[randomIndex];
};

function getTotalPage(pageSize: number, total: number) {
  return Math.ceil(
    total % pageSize == 0 ? total / pageSize : total / pageSize + 1,
  );
}

function parseLocalStorgeObj(
  isServer: boolean,
  key: string,
  json: boolean,
  defVal: any,
): any {
  let returnVal = defVal || null;
  if (!isServer) {
    const val = localStorage.getItem(key);
    if (val) {
      returnVal = json ? JSON.parse(val) : val;
    }
  }
  return returnVal;
}

function storageObj(isServer: boolean, key: string, obj: any): void {
  if (!isServer) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}

function getSqlByQuery(query: Query[] | null): string {
  var sql = "where 1 = 1";
  if (query) {
    query.map((r) => {
      let needSecond = true;
      if (r.exp && r.filed && r.table && r.type) {
        switch (r.exp) {
          default:
            break;
          case Expression.NOT_NULL:
            sql += ` and ${r.table}.${r.filed} IS NOT NULL`;
            needSecond = false;
            break;
          case Expression.NULL:
            sql += ` and ${r.table}.${r.filed} IS NULL`;
            needSecond = false;
            break;
        }
        if (r.val) {
          switch (r.type) {
            default:
              throw error(`Sql Type not support ${r.type}`);
            case SQLType.VARCHAR: {
              if (r.exp === Expression.LIKE) {
                r.val = `'%${r.type}%'`;
              } else {
                r.val = `'${r.type}'`;
              }
              break;
            }
            case SQLType.NUMBER: {
              break;
            }
            case SQLType.DATE: {
              let format = dayjs(r.val).format("YYYY/MM/DD");
              r.val = `'${format}'`;
              break;
            }
            case SQLType.DATE_TIME: {
              let format = dayjs(r.val).format("YYYY/MM/DD HH:mm:ss");
              r.val = `'${format}'`;
              break;
            }
          }
        }
        if (needSecond) {
          sql += ` and ${r.table}.${r.filed} ${r.exp} ${r.val}`;
        }
      }
    });
  }
  return sql;
}

export {
  getRandomColor,
  getTotalPage,
  parseLocalStorgeObj,
  storageObj,
  getSqlByQuery,
};
