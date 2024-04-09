const getRandomColor = (tagsColors:string[]) : any => {
  const randomIndex = Math.floor(Math.random() * tagsColors.length);
  return tagsColors[randomIndex];
};

function getTotalPage(pageSize:number,total:number) {
  return Math.ceil(total % pageSize == 0 ? total/pageSize: total/pageSize + 1)
}

function parseLocalStorgeObj(isServer: boolean,key: string, json: boolean,defVal: any) : any {
  let returnVal = defVal || null
  if(!isServer){
    const val = localStorage.getItem(key)
    if(val){
      returnVal = json ? JSON.parse(val) : val
    }
  }
  return returnVal
}

export {
  getRandomColor,getTotalPage,parseLocalStorgeObj
}