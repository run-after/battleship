const gameboard = () => { 

  const board = {
    1: [null, null, null, null, null, null, null, null, null, null],
    2: [null, null, null, null, null, null, null, null, null, null],
    3: [null, null, null, null, null, null, null, null, null, null],
    4: [null, null, null, null, null, null, null, null, null, null],
    5: [null, null, null, null, null, null, null, null, null, null],
    6: [null, null, null, null, null, null, null, null, null, null],
    7: [null, null, null, null, null, null, null, null, null, null],
    8: [null, null, null, null, null, null, null, null, null, null],
    9: [null, null, null, null, null, null, null, null, null, null],
    10: [null, null, null, null, null, null, null, null, null, null]
  };

  const ships = [];

  const placeShip = (ship, start, finish) => {
    const startX = start[0];
    const startY = start[1];
    const endX = finish[0];
    const endY = finish[1];

    if (startX === endX) { // if vertical
      let shipLocation = 0;
      for (let y = startY; y <= endY; y++) {
        
        board[y][startX] = [ship, shipLocation];
        shipLocation++;
      };
      ships.push(ship);
    } else { // if horizontal
      let shipLocation = 0;
      for (let x = startX; x <= endX; x++) {
        
        board[startY][x] = [ship, shipLocation];
        shipLocation++;
      };
      ships.push(ship);
    };

    return board;
  };

  const receiveAttack = (x, y) => {
    
    if (board[y][x]) {
      let ship = board[y][x][0];
      let shipLocation = board[y][x][1];
      
      if (board[y][x] === 'miss' || ship.hitStatus[shipLocation] === true) {
        return 'already guessed'
      };
      ship.hit(shipLocation);
      return 'hit';
    } else {
      board[y][x] = 'miss';
      return 'miss';
    };

  };

  const allShipsSunk = () => {
    return ships.map(x => x.isSunk()).every(x => x === true)
  }

  return { board, placeShip, receiveAttack, allShipsSunk };
  
};

export default gameboard;