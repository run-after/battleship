import gameboardDOM from './gameboardDOM';;

const playerPieceDOM = (compBoard, playerBoard, player, playerShips, playRound, isGameOver) => {
  
  // Initial setup of board
  const boardSetup = (board, boardDOM) => {
    // loop through whole array
    boardKeys.map(key => {
      // new row
      let row = document.createElement('div');
      row.classList.add('row');
      boardDOM.appendChild(row);

      // all board spaces based off board array
      board[key].map((x, i) => {
        let space = document.createElement('div');
        space.classList.add('space');
        space.setAttribute('data-coord', `${i},${key}`);
        // Show players ships
        if (boardDOM === playerBoardDOM && x) {
          space.style.background = 'grey';
        };
        row.appendChild(space);
      });
    });
  };
  const boardKeys = Object.keys(playerBoard.board);
  const playerBoardDOM = document.querySelector('.player-board');
  playerBoardDOM.textContent = 'Place your ships';
  boardSetup(playerBoard.board, playerBoardDOM);
  // Maybe dynamically create player board here and comp board with 
  // gameboardDOM
  //////////////////////////////////////////////////////////////

  // Will change where button is placed later (not comp board)
  const compBoardDOM = document.querySelector('.computer-board');
  const orientBtn = document.createElement('button');
  orientBtn.textContent = 'orientation';
  compBoardDOM.appendChild(orientBtn);

  orientBtn.addEventListener('click', () => {
    if (orientation === 'x') {
      orientation = 'y';
    } else {
      orientation = 'x';
    };
  });
  //////////////// THE ABOVE IS NOT DONE!! //////////////////////
  
  const areSpacesEmpty = (start, end, length) => {
    const startX = start[0];
    const startY = start[1];
    const endX = end[0];
    const endY = end[1];
    if (orientation === 'x') {
      for (let i = 0; i < length; i++) {
        if (playerBoard.board[startY][Number(startX) + i]) {
          return false
        };
      };
      return true;
    } else {
      for (let i = 0; i < length; i++) {
        if (playerBoard.board[Number(startY) + i][startX]) {
          return false;
        };
      };
      return true;
    };
  };
    
  // picks first ship from playerShips array passed in from game
  let currentShip = playerShips.shift();
  // sets length to first ships length
  let length = currentShip.length;
  let orientation = 'x';
  
  // adds click listener
  playerBoardDOM.addEventListener('click', (e) => {
    // Only allow click in a space, not inbetween
    if (e.target.classList[0] !== 'space') return;

    // takes coords from dom element data-coord
    const coords = e.target.dataset.coord.split(',');
    
    /* X ORIENTATION */
    if (orientation === 'x') {
      // find square for last spot of ship
      const lastShipSquare = document.querySelector(`[data-coord="${Number(coords[0]) + length - 1},${coords[1]}"]`);
      // if there is a square for the last spot of a ship and nothing in the squares
      if (lastShipSquare && areSpacesEmpty(coords, [Number(coords[0]) + length - 1, coords[1]], length)) {
        // places ship based on ship length and starting coord
        playerBoard.placeShip(currentShip, coords, [Number(coords[0]) + length - 1, coords[1]]);

        // Clear board and render with ships placed
        playerBoardDOM.innerHTML = 'Place your ships';
        boardSetup(playerBoard.board, playerBoardDOM);
        // add listeners back
        const spaces = document.querySelectorAll('.space');
        spaces.forEach(space => {
          space.addEventListener('mouseenter', hover);
          space.addEventListener('mouseleave', leave);
        });
        // else do nothing
      } else {
        return;
      }
    } else {
      /* Y ORIENTATION */
    
      // find square for last spot of ship
      const lastShipSquare = document.querySelector(`[data-coord="${coords[0]},${Number(coords[1]) + length - 1}"]`);
      // if there is a square for the last spot of a ship and nothing in the squares
      if (lastShipSquare && areSpacesEmpty(coords, [coords[0], Number(coords[1]) + length - 1], length)) {
        // places ship based on ship length and starting coord
        playerBoard.placeShip(currentShip, coords, [coords[0], Number(coords[1]) + length - 1]);
        
        // Clear board and render with ships placed
        playerBoardDOM.innerHTML = 'Place your ships';
        boardSetup(playerBoard.board, playerBoardDOM);
        
        // add listeners back
        const spaces = document.querySelectorAll('.space');
        spaces.forEach(space => {
          space.addEventListener('mouseenter', hover);
          space.addEventListener('mouseleave', leave);
        });
        // else do nothing
      } else {
        return;
      };
    };
    
    //takes next ship from playerShip array passed in
    currentShip = playerShips.shift();
    // checks if any more ships
    if (currentShip) {
      // if there is a ship, set the length
      length = currentShip.length;
      // if not, no more hover, get rid of listeners, and display final boards
    } else {
      length = 0;
      //removes listeners
      playerBoardDOM.replaceWith(playerBoardDOM.cloneNode(true));
      // display gameboard
      gameboardDOM(compBoard, playerBoard, player, playRound, isGameOver);
    };
  });

  const hover = (e) => {
    const orgin = e.target.dataset.coord.split(',');
    let square = [];
    if (orientation === 'y') {
      for (let i = 0; i < length; i++) {
        const shipSquare = document.querySelector(`[data-coord="${orgin[0]},${Number(orgin[1]) + i}"]`);
        // check if shipSquare is a sqaure
        if (shipSquare) {
          square.push(shipSquare);
        };
      };
    } else {
      
      for (let i = 0; i < length; i++) {
        const shipSquare = document.querySelector(`[data-coord="${Number(orgin[0]) + i},${orgin[1]}"]`)
        //check if shipSquare is a square
        if (shipSquare) {
          square.push(shipSquare);
        };
      };
    };
    square.forEach(x => { x.style.border = '1px solid red' });
  };

  const leave = (e) => {
    const orgin = e.target.dataset.coord.split(',');
    let square = [];
    if (orientation === 'y') {
      for (let i = 0; i < length; i++) {
        const shipSquare = document.querySelector(`[data-coord="${orgin[0]},${Number(orgin[1]) + i}"]`);
        // check if shipSquare is a sqaure
        if (shipSquare) {
          square.push(shipSquare);
        };
      };
    } else {
      for (let i = 0; i < length; i++) {
        const shipSquare = document.querySelector(`[data-coord="${Number(orgin[0]) + i},${orgin[1]}"]`);
        // check if shipSquare is a sqaure
        if (shipSquare) {
          square.push(shipSquare);
        };
      };
    };
    square.forEach(x => { x.style.border = '1px solid white' });
  };

  const spaces = document.querySelectorAll('.space');
  spaces.forEach(space => {
    space.addEventListener('mouseenter', hover);
    space.addEventListener('mouseleave', leave);
  });
};

export default playerPieceDOM;