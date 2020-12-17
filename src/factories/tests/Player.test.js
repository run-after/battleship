import playerFactory from '../Player';

test('computerPlay() to return 2 coordanates on the board', () => {
  const bill = playerFactory();
  const move = bill.computerPlay().split(',');
  expect(Number(move[0])).toBeLessThan(10);
  expect(Number(move[0])).toBeGreaterThan(-1)
  expect(Number(move[1])).toBeLessThan(11);
  expect(Number(move[1])).toBeGreaterThan(0);
});

test('computerPlay() adds move to list of played moves', () => {
  const bill = playerFactory();
  const move = bill.computerPlay();

  expect(bill.playedMoves.includes(move)).toBeTruthy();

  const move2 = bill.computerPlay();
  expect(bill.playedMoves.includes(move2)).toBeTruthy();

  const move3 = bill.computerPlay();
  expect(bill.playedMoves.includes(move3)).toBeTruthy();
});