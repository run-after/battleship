import Gameboard from './factories/Gameboard';
import gameboardDOM from './gameboardDOM';
import shipFactory from './factories/Ship';
import playerFactory from './factories/Player';

const Game = () => {

  const player = playerFactory();
  const playerBoard = Gameboard();
  const playerShips = [
    shipFactory(5), //carrier
    shipFactory(4), //battleship
    shipFactory(3), //cruiser
    shipFactory(3), //sub
    shipFactory(2) //destroyer
  ];
  playerBoard.randomlyPlaceShips(playerShips, playerBoard);

  const computerPlayer = playerFactory();
  const compBoard = Gameboard();
  const compShips = [
    shipFactory(5), //carrier
    shipFactory(4), //battleship
    shipFactory(3), //cruiser
    shipFactory(3), //sub
    shipFactory(2) //destroyer
  ];
  compBoard.randomlyPlaceShips(compShips, compBoard);
  
  const isGameOver = () => {
    return compBoard.allShipsSunk() || playerBoard.allShipsSunk();
  };
  
  const playRound = () => {
    
    if (compBoard.allShipsSunk()) {
      alert('Player wins');
      document.querySelector('.computer-board').classList.add('disable-clicks');
    } else if (playerBoard.allShipsSunk()) {
      alert('Computer wins');
    };
  
    const play = computerPlayer.computerPlay();
    const x = play[0];
    const y = play[1];
    
    return `${x},${y}`;
  };
  
  gameboardDOM(compBoard, playerBoard, playRound, isGameOver);
  
};

export default Game;

// Need to implement drag and drop for player ships
// Need a way to start new game