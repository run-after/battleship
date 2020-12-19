const gameboardDOM = (compBoard, playerBoard, round) => {
  
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
        space.setAttribute('data-coord', `${i},${key}`)
        
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

      const attack = board.receiveAttack(x, y);
      console.log(board.board[y][x][0].isSunk())
      if (attack === 'hit') {
        e.target.style = 'background: red';
      } else if (attack === 'miss') {
        e.target.style = 'background: blue';
      };
      
      // don't increment round if 'already guessed'
      round++;
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