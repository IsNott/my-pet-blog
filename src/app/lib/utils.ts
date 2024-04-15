import { Query } from "./dataDefinition";

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

function getSqlByQuery(query: Query[] | null) : string {
  var sql = 'where 1 = 1';
  if(query){
    query.map(r => {
      sql += `and ${r.table}.${r.filed} ${r.exp} ${r.val}`
    })
  }
  return sql
}

export { getRandomColor, getTotalPage, parseLocalStorgeObj, storageObj,getSqlByQuery };
