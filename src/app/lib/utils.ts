const getRandomColor = (tagsColors:string[]) => {
  const randomIndex = Math.floor(Math.random() * tagsColors.length);
  return tagsColors[randomIndex];
};

export default getRandomColor