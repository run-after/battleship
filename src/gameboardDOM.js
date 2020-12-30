const gameboardDOM = (compBoard, playerBoard, player, playRound, isGameOver) => {
  
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
  playerBoardDOM.textContent = `${player.name}'s Board`;
  boardSetup(playerBoard.board, playerBoardDOM);

  playerBoardDOM.classList.add('disable-clicks');// don't allow player to attack own board

  const arena = document.querySelector('.arena');
  const computerBoardDOM = document.createElement('div');
  computerBoardDOM.classList.add('computer-board');
  arena.appendChild(computerBoardDOM);

  //const computerBoardDOM = document.querySelector('.computer-board');
  computerBoardDOM.textContent = 'Computers Board';
  boardSetup(compBoard.board, computerBoardDOM);

  const handleClick = (board, e) => {
    
    // Only add listener to spaces on board
    if (e.target.classList[0] === 'space') {
      const coords = e.target.dataset.coord.split(',');
      
      let x = Number(coords[0]);
      let y = Number(coords[1]);

      const attack = board.receiveAttack(x, y);
      
      e.target.classList.add('disable-clicks');

      if (attack === 'hit') {
        const hit = document.createElement('div');
        hit.classList.add('hit');
        e.target.appendChild(hit);
      } else if (attack === 'miss') {
        e.target.style = 'background: blue';
      };

      return attack;
    }; 
  };

  computerBoardDOM.addEventListener('click', (e) => {
    const result = handleClick(compBoard, e);
    const compMove = playRound().split(',');
    let square = playerBoardDOM.querySelector(`[data-coord='${compMove[0]},${compMove[1]}']`);

    if(result && !isGameOver()) {
      setTimeout(()=>square.click(), 500);  
    };
  });
  
  playerBoardDOM.addEventListener('click', (e) => {
    handleClick(playerBoard, e);
  });

};

export default gameboardDOM;