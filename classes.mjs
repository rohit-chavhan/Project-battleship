class Ship {
  constructor(length) {
    this.length = length;
    this.count = 0;
  }
  hit() {
    this.count += 1;
  }

  toSunk() {
    return this.count >= this.length;
  }
}

class GameBoard {
  constructor() {
    this.ray = this.createGrid();
  }

  createGrid() {
    let rowAndColumns = 10;
    let array = [];

    for (let i = 0; i < rowAndColumns; i++) {
      array[i] = [];
      for (let j = 0; j < rowAndColumns; j++) {
        array[i].push(Cell());
      }
    }
    return array;
  }

  placeShip(array) {
    let ship = new Ship(array.length);
    array.forEach((j) => {
      let ks = this.ray[j[0]];
      ks[j[1]].addValue(ship);
    });
    return ship;
  }

  receiveAttack(a, b) {
    let x = this.ray[a][b];
    if (x.getValue() !== '') {
      let y = x.getValue();
      y.hit();

      x.addToken(`image`);
    } else {
      x.addToken(`missed shot`);
    }
  }

  recreate() {
    this.ray = '';
    this.ray = this.createGrid();
  }
}

function Cell() {
  let value = '';
  let token = '.';

  const addValue = (boat) => (value = boat);
  const addToken = (tokenVal) => (token = tokenVal);

  const getValue = () => value;
  const getToken = () => token;

  return {
    addValue,
    getValue,
    addToken,
    getToken,
  };
}

export { GameBoard };
