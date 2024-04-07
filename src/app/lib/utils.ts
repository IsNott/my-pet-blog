const getRandomColor = (tagsColors:string[]) : any => {
  const randomIndex = Math.floor(Math.random() * tagsColors.length);
  return tagsColors[randomIndex];
};

function getTotalPage(pageSize:number,total:number) {
  return Math.ceil(total % pageSize == 0 ? total/pageSize: total/pageSize + 1)
}

export {
  getRandomColor,getTotalPage
}
