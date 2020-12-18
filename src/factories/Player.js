const playerFactory = () => {
  const moves = [];

  const computerPlay = () => {
    const xCoord = Math.floor(Math.random() * 9); 
    const yCoord = Math.floor(Math.random() * 10) + 1;
    // don't allow same move twice;
    if (moves.includes(`${xCoord},${yCoord}`)) { 
      computerPlay();
    };
    moves.push(`${xCoord},${yCoord}`)
    return [xCoord, yCoord]
  }

  return {
    playedMoves: moves,
    computerPlay: computerPlay
  }

}

export default playerFactory;