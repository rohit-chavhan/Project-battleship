import { ray } from './ray.mjs';

import { GameBoard } from './classes.mjs';

import { randomForComputerStat, dynamicImages } from './domFuncs.mjs';

let userShip = undefined;
let computerShip = undefined;

let currentRay = '';
let currentDiv = '';

let count = 0;
let playerx = 0;
let computerX = 0;

let xray = [];
let glbalPlayers = [];
/* at above, at 0 index we have user obj and at index 1 we have computer obj */

const randomBtn = document.querySelector('.random');
const playBtn = document.querySelector('.play');

const updateScreen = () => {
  currentDiv.textContent = '';
  currentRay.ray.forEach((row, rowIndex) => {
    row.forEach((_, cellIndex) => {
      const cellButton = document.createElement('button');
      cellButton.classList.add('cell');
      cellButton.dataset.row = `${rowIndex}`;
      cellButton.dataset.column = `${cellIndex}`;

      let dom = currentRay.ray[rowIndex][cellIndex].getToken();

      if (dom === '.') {
        cellButton.textContent = dom;
      } else {
        let images = dynamicImages(dom);
        cellButton.appendChild(images);
      }

      currentDiv.appendChild(cellButton);
    });
  });
};

let eachIndex = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [0, 8],
  [0, 9],
  [1, 0],
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
  [1, 7],
  [1, 8],
  [1, 9],
  [2, 0],
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6],
  [2, 7],
  [2, 8],
  [2, 9],
  [3, 0],
  [3, 1],
  [3, 2],
  [3, 3],
  [3, 4],
  [3, 5],
  [3, 6],
  [3, 7],
  [3, 8],
  [3, 9],
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
  [4, 5],
  [4, 6],
  [4, 7],
  [4, 8],
  [4, 9],
  [5, 0],
  [5, 1],
  [5, 2],
  [5, 3],
  [5, 4],
  [5, 5],
  [5, 6],
  [5, 7],
  [5, 8],
  [5, 9],
  [6, 0],
  [6, 1],
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],
  [6, 6],
  [6, 7],
  [6, 8],
  [6, 9],
  [7, 0],
  [7, 1],
  [7, 2],
  [7, 3],
  [7, 4],
  [7, 5],
  [7, 6],
  [7, 7],
  [7, 8],
  [7, 9],
  [8, 0],
  [8, 1],
  [8, 2],
  [8, 3],
  [8, 4],
  [8, 5],
  [8, 6],
  [8, 7],
  [8, 8],
  [8, 9],
  [9, 0],
  [9, 1],
  [9, 2],
  [9, 3],
  [9, 4],
  [9, 5],
  [9, 6],
  [9, 7],
  [9, 8],
  [9, 9],
];

function getRandomForComp(ray) {
  let num = Math.floor(Math.random() * ray.length);
  let newX = ray[num];
  eachIndex = ray.filter((el) => el !== newX);
  return newX;
}

function getWinner() {
  if (xray[0].toSunk === true) {
    document.querySelector('.h2').innerHTML = 'bot is a winner';
  } else if (xray[1].toSunk() === true) {
    document.querySelector('.h2').innerHTML = 'human is a winner';
  }
}

document.querySelector('.reload').addEventListener('click', () => {
  location.reload();
});

function controller(e) {
  if (e.target.innerText === '.') {
    const rowCell = Number(e.target.dataset.row);
    const columnCell = Number(e.target.dataset.column);
    currentRay.receiveAttack(rowCell, columnCell);
    // console.log(xray[1]);
    updateScreen();
    changePlayers(glbalPlayers[0]);
    let ace = getRandomForComp(eachIndex);
    currentRay.receiveAttack(ace[0], ace[1]);
    updateScreen();
    changePlayers(glbalPlayers[1]);
    updateScreen();
    getWinner();
    console.log(xray);
  }
}

function randomClick() {
  currentRay.recreate();
  if (count === 6) {
    count = 0;
  }
  let curentStrat = ray[count];
  playerx = curentStrat;
  currentRay.placeShip(curentStrat);
  curentStrat.forEach((el) => currentRay.receiveAttack(el[0], el[1]));
  updateScreen();
  count += 1;
}

function red(arg) {
  let k = arg[0];
  let x = currentRay.ray;
  let kb = x[k[0]];
  xray.push(kb[k[1]].getValue());
}

function grabObjs() {
  if (xray.length === 0) {
    red(playerx);
  } else {
    red(ray[computerX]);
  }
}

function playClick() {
  randomBtn.remove();
  currentRay.recreate();
  userShip = currentRay.placeShip(playerx);
  grabObjs();
  updateScreen();
  const bot = new GameBoard();
  glbalPlayers.push({ obj: bot, class: '.board2' });
  changePlayers(glbalPlayers[1]);
  currentDiv.dataset.computer = true;
  computerX = randomForComputerStat(count);
  computerShip = currentRay.placeShip(ray[computerX]);
  grabObjs();
  currentDiv.addEventListener('click', controller);
  ScreenController();
}

function chocingPlayerStrategies() {
  randomBtn.addEventListener('click', randomClick);
  playBtn.addEventListener('click', playClick);
}

function ScreenController() {
  updateScreen();
  chocingPlayerStrategies();
}

function changePlayers(obj) {
  currentDiv = document.querySelector(`${obj.class}`);
  currentRay = obj.obj;
}

(function () {
  const player1 = new GameBoard();
  glbalPlayers.push({ obj: player1, class: '.board1' });
  changePlayers(glbalPlayers[0]);
  ScreenController();
  randomClick();
})();
