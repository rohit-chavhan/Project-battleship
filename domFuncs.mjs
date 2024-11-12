function randomForComputerStat(num) {
  const getNum = () => Math.floor(Math.random() * 7);
  let player2Strat = getNum();

  while (player2Strat === num) {
    player2Strat = getNum();
  }

  return player2Strat;
}

function dynamicImages(args) {
  let imageSrc = args === 'image' ? './emoji/boat.png' : './emoji/damage.png';

  const image = document.createElement('img');
  image.classList.add('buttonImage');
  image.src = imageSrc;

  return image;
}

export { randomForComputerStat, dynamicImages };
