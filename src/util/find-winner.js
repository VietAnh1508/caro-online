export function haveWinner({ squares, currCoordinate }) {
  return (
    checkFiveInARow(squares, currCoordinate) ||
    checkFiveInAColumn(squares, currCoordinate) ||
    checkFiveInPrimaryDiagonal(squares, currCoordinate) ||
    checkFiveInSubDiagonal(squares, currCoordinate)
  );
}

function checkFiveInARow(squares, { x, y }) {
  let currCell = squares[x][y];

  let countToLeft = 0;
  const leftLimit = y - 5;
  for (let i = y; i >= leftLimit; i--) {
    if (squares[x][i] === currCell) {
      countToLeft++;
    } else {
      break;
    }
  }

  let countToRight = 0;
  const rightLimit = y + 5;
  for (let i = y + 1; i <= rightLimit; i++) {
    if (squares[x][i] === currCell) {
      countToRight++;
    } else {
      break;
    }
  }

  return countToLeft + countToRight === 5;
}

function checkFiveInAColumn(squares, { x, y }) {
  let currCell = squares[x][y];

  let countUp = 0;
  const topLimit = x - 5;
  for (let i = x; i >= topLimit; i--) {
    if (squares[i] && squares[i][y] === currCell) {
      countUp++;
    } else {
      break;
    }
  }

  let countDown = 0;
  const bottomLimit = x + 5;
  for (let i = x + 1; i <= bottomLimit; i++) {
    if (squares[i] && squares[i][y] === currCell) {
      countDown++;
    } else {
      break;
    }
  }

  return countUp + countDown === 5;
}

function checkFiveInPrimaryDiagonal(squares, { x, y }) {
  let currCell = squares[x][y];

  let countUp = 0;
  for (let i = 0; i < 5; i++) {
    if (squares[x - i] && squares[x - i][y - i] === currCell) {
      countUp++;
    } else {
      break;
    }
  }

  let countDown = 0;
  const bottomLimit = x + 5;
  for (let i = 1; i <= bottomLimit; i++) {
    if (squares[x + i] && squares[x + i][y + i] === currCell) {
      countDown++;
    } else {
      break;
    }
  }

  return countUp + countDown === 5;
}

function checkFiveInSubDiagonal(squares, { x, y }) {
  let currCell = squares[x][y];

  let countUp = 0;
  for (let i = 0; i < 5; i++) {
    if (squares[x - i] && squares[x - i][y + i] === currCell) {
      countUp++;
    } else {
      break;
    }
  }

  let countDown = 0;
  const bottomLimit = x + 5;
  for (let i = 1; i <= bottomLimit; i++) {
    if (squares[x + i] && squares[x + i][y - i] === currCell) {
      countDown++;
    } else {
      break;
    }
  }

  return countUp + countDown === 5;
}
