const openPlayerConfig = (event) => {
  editedPlayer = +event.target.dataset.playerid;

  showWithOpacity(playerConfigOverlayElement, 500);
  showWithOpacity(backdropElement, 500);
}

const closePlayerConfig = (event) => {
  hideWithOpacity(playerConfigOverlayElement, 350);
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
  if (enteredPlayerName.length > 15) {
    isValid = false;
    configErrorsElement.innerHTML += "<li>Player name must be shorter than 15 characters</li>";
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

const updatePlayer = (playerName) => {
  const updatedPlayerDataElement = document.getElementById(`player-${editedPlayer}-data`);
  updatedPlayerDataElement.children[1].textContent = playerName;

  players[editedPlayer - 1].playerName = playerName;

  console.log(players);

  closePlayerConfig();
}