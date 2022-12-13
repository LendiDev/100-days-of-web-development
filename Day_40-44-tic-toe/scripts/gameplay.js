const startNewGame = () => {
  if (players[0].playerName === '' || players[1].playerName === '') {
    alert("Please enter valid player names for both players!");
    return;
  }

  showWithOpacity(gamePlayElement, 500);
}

const switchPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;

  playerTurnElement.textContent = players[activePlayer].playerName;
}

const selectedGameField = (event) => {
  const gameFieldElement = event.target;
  
  if (gameFieldElement.tagName !== "LI") {
    return;
  }

  gameFieldElement.textContent = players[activePlayer].symbol;
  gameFieldElement.classList.add('disabled');

  switchPlayer();
}