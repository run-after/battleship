const gameboardDOM = (compBoard, playerBoard) => {
  
  const boardSetup = (board, boardDOM) => {
    // loop through whole array
    boardKeys.map(key => {
      // new row
      let row = document.createElement('div');
      row.classList.add('row');
      boardDOM.appendChild(row);

      // all board spaces based off board array
      board[key].map((x, i) => {
        // this will all change. this is what 
        // displays board when clicked
        let display;
        if (x) {
          if (typeof x === 'string') {
            display = 'miss';
          } else {
            if (x[0].hitStatus[x[1]]) {
              display = 'hit';
            };
          };
        } else {
          display = x;
        };

        let space = document.createElement('div');
        space.classList.add('space');
        space.setAttribute('data-coord', `${i},${key}`)
        space.textContent = display;
        row.appendChild(space);
      });
    });
  };

  const boardKeys = Object.keys(playerBoard.board);

  const computerBoardDOM = document.querySelector('.computer-board');
  computerBoardDOM.textContent = 'Computer Board';
  boardSetup(compBoard.board, computerBoardDOM);

  const playerBoardDOM = document.querySelector('.player-board');
  playerBoardDOM.textContent = 'Player Board';
  boardSetup(playerBoard.board, playerBoardDOM);

  const addListener = (board, e) => {
    // Only add listener to spaces on board
    if (e.target.classList[0] === 'space') {
      const coords = e.target.dataset.coord.split(',');
    
      let x = Number(coords[0]);
      let y = Number(coords[1]);
        
      board.receiveAttack(x, y);
    
      gameboardDOM(compBoard, playerBoard);
    };
    
  };

  computerBoardDOM.addEventListener('click', (e) => {
    addListener(compBoard, e);
  });
  
  playerBoardDOM.addEventListener('click', (e) => {
    addListener(playerBoard, e);
  });

};

export default gameboardDOM;






/*
    // top row with x coords
    let row = document.createElement('div');
    row.classList.add('row');
    boardDOM.appendChild(row);
    
    // blank space in upper corner
    let space = document.createElement('div');
    space.classList.add('space');
    row.appendChild(space);

    // x coords
    board[1].map((x, i) => {
      space = document.createElement('div');
      space.classList.add('space');
      space.textContent = i;
      row.appendChild(space);
    });
*/

/*
      // add y coords
      let space = document.createElement('div');
      space.classList.add('space');
      space.textContent = key;
      row.appendChild(space);
*/