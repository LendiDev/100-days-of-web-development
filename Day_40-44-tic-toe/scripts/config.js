const openPlayerConfig = (event) => {
  editedPlayer = +event.target.dataset.playerid;

  if (players[editedPlayer - 1].playerName === '-') {
    playerNameInputElement.value = "";
  } else {
    playerNameInputElement.value = players[editedPlayer - 1].playerName;
  }

  showWithOpacity(playerConfigOverlayElement, 500);
  showWithOpacity(backdropElement, 500);
}

const openPlayerResetWarning = (event) => {
  editedPlayer = +event.target.dataset.playerid;

  if (currentRound === 1) {
    resetPlayerConfig();
    return;
  }

  showWithOpacity(playerResetOverlayElement, 500);
  showWithOpacity(backdropElement, 500);
}

const closePlayerConfig = (event) => {
  hideWithOpacity(playerConfigOverlayElement, 350);
  hideWithOpacity(playerResetOverlayElement, 350);
  hideWithOpacity(backdropElement, 350).then(() => {
    configErrorsElement.innerHTML = "";
    formElement.classList.remove('error');
    playerNameInputElement.value = "";
  });
}

const validatePlayerName = (enteredPlayerName) => {
  const otherPlayerId = editedPlayer === 2 ? 1 : 2;
  const otherPlayerName = document.getElementById(`player-${otherPlayerId}-data`).children[1].textContent;
  let isValid = true;

  configErrorsElement.innerHTML = "";

  if (!enteredPlayerName) {
    isValid = false;
    configErrorsElement.innerHTML += "<li>Please enter a valid name</li>";
  }
  if (otherPlayerName === enteredPlayerName) {
    isValid = false;
    configErrorsElement.innerHTML += "<li>Player name must be different to other player name</li>";
  }
  if (!/^[a-z0-9 ]+$/gi.test(enteredPlayerName)) {
    isValid = false;
    configErrorsElement.innerHTML += "<li>Player name must contain only letters and numbers</li>";
  }
  if (enteredPlayerName.length < 2) {
    isValid = false;
    configErrorsElement.innerHTML += "<li>Player name must be at least 2 character long</li>";
  }
  if (enteredPlayerName.length > 20) {
    isValid = false;
    configErrorsElement.innerHTML += "<li>Player name must be shorter than 20 characters</li>";
  }

  return isValid;
}

const savePlayerConfig = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get('player-name').trim();
  playerNameInputElement.value = enteredPlayerName;

  if (validatePlayerName(enteredPlayerName)) {
    updatePlayer(enteredPlayerName);
    formElement.classList.remove('error');
  } else {
    formElement.classList.add('error');
  }
}

const resetPlayerConfig = (event) => {
  if (event) {
    event.preventDefault();
  }

  hideWithOpacity(gamePlayElement, 300);
  updatePlayer('-');
}

const updatePlayer = (playerName) => {
  const updatedPlayerDataElement = document.getElementById(`player-${editedPlayer}-data`);
  updatedPlayerDataElement.children[1].textContent = playerName;

  players[editedPlayer - 1].playerName = playerName;

  closePlayerConfig();
  savePlayersState();
}

const savePlayersState = () => {
  window.localStorage.setItem('players', JSON.stringify(players));
}

const getPlayersState = () => {
  return window.localStorage.getItem('players');
}

const initConfig = () => {

  if (window.localStorage.getItem('players')) {
    players = JSON.parse(window.localStorage.getItem('players'));
  } else {
    savePlayersState();
  }

  const player1DataElement = document.getElementById(`player-1-data`);
  const player2DataElement = document.getElementById(`player-2-data`);
  player1DataElement.children[1].textContent = players[0].playerName;
  player2DataElement.children[1].textContent = players[1].playerName;

  savePlayersState();
}