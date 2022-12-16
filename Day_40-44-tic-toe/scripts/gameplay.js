const startNewGame = () => {
  if (players[0].playerName === '-' || players[1].playerName === '-') {
    errorNewGameElement.style.display = 'block';
    return;
  }
  errorNewGameElement.style.display = 'none';

  editedPlayer = 0;
  activePlayer = randomIntFromInterval(0, 1);
  currentRound = 1;

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // clear game data state
      gameData[i][j] = 0;

      // clear game board
      const boardFieldElement = gameBoardElement.children[gameBoardIndex];
      boardFieldElement.innerHTML = '';
      boardFieldElement.classList.remove('disabled');
      gameBoardIndex++;
    }
  }

  hideWithOpacity(gameOverElement, 0);
  showWithOpacity(gamePlayElement, 500);

  gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-player-name">WINNER PLAYER NAME</span>!';
  playerTurnTextElement.style.display = 'block';
  gameBoardElement.style.pointerEvents = 'auto';
  displayPlayersTurn();
}

const displayPlayersTurn = () => {
  playerNameTurnElement.textContent = players[activePlayer].playerName;
}

const switchPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;

  displayPlayersTurn();
}

const selectedGameField = (event) => {
  const gameFieldElement = event.target;

  if (gameFieldElement.tagName !== "LI") return;

  const selectedColumn = gameFieldElement.dataset.col - 1;
  const selectedRow = gameFieldElement.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) return;

  gameFieldElement.textContent = players[activePlayer].symbol;
  gameFieldElement.classList.add('disabled');

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForWinner();

  if (winnerId) {
    showGameOver(winnerId);
  }

  currentRound++;
  switchPlayer();
}

const checkForWinner = () => {
  const LENGTH = 3;

  // check rows
  for (let i = 0; i < LENGTH; i++) {
    if (gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]) {
      return gameData[i][0];
    }
  }

  // check columns
  for (let i = 0; i < LENGTH; i++) {
    if (gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[1][i] === gameData[2][i]) {
      return gameData[0][i];
    }
  }

  // check diagonals
  // top left to bottom right
  if (gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) {
    return gameData[0][0];
  }

  // bottom left to top right
  if (gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]) {
    return gameData[2][0];
  }

  // draw
  if (currentRound === 9) {
    return -1
  }
}

const showGameOver = (winnerId) => {

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].playerName;
    gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = 'It\s a draw!';
  }

  showWithOpacity(gameOverElement, 500);
  playerTurnTextElement.style.display = 'none';
  gameBoardElement.style.pointerEvents = 'none';
}