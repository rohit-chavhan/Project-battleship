import { Ship, GameBoard, Cell } from './battle-ship';

describe('check for ship class props and methods', () => {
  let ship = new Ship(1);
  ship.hit();
  test('check if it has property of lenght', () => {
    expect(ship).toHaveProperty('length');
  });

  test('if ship class has method hit', () => {
    expect(ship).toEqual({
      length: 1,
      count: 1,
    });
  });

  test('toSunk method works and return boolean', () => {
    let x = ship.toSunk();
    expect(x).toBe(true);
  });
});

describe('GameBoard class is working', () => {
  let player1 = new GameBoard('player1');

  test('player1 has properties ray and name', () => {
    expect(player1).toMatchObject({
      name: expect.any(String),
      ray: expect.any(Array),
    });
  });

  test.only('check the length of array in prop ray', () => {
    expect(player1.ray).toHaveLength(10);
  });
});

describe('Cell function should give object of funcs', () => {
  let cellOne = Cell();
  test('cell should have 2 func', () => {
    expect(cellOne).toMatchObject({
      addValue: expect.any(Function),
      getValue: expect.any(Function),
    });
  });
});
