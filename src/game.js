import Gameboard from './factories/Gameboard';
import playerPieceDOM from './playerPieceDOM';
import shipFactory from './factories/Ship';
import playerFactory from './factories/Player';

const Game = () => {

  const player = playerFactory('playerName');
  const playerBoard = Gameboard();
  const playerShips = [
    shipFactory(5), //carrier
    shipFactory(4), //battleship
    shipFactory(3), //cruiser
    shipFactory(3), //sub
    shipFactory(2) //destroyer
  ];
  
  const computerPlayer = playerFactory('Computer');
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
    const modal = document.querySelector('.modal');
    if (compBoard.allShipsSunk()) {
      modal.innerHTML = 'Player Wins!'
      modal.classList.remove('hide');
      document.querySelector('.computer-board').classList.add('disable-clicks');
    } else if (playerBoard.allShipsSunk()) {
      modal.innerHTML = 'Computer Wins!'
      modal.classList.remove('hide');
      document.querySelector('.computer-board').classList.add('disable-clicks');
    };
  
    const play = computerPlayer.computerPlay();
    const x = play[0];
    const y = play[1];
    
    return `${x},${y}`;
  };
  playerPieceDOM(compBoard, playerBoard, player, playerShips, playRound, isGameOver);  
};

export default Game;