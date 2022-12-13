let editedPlayer = 0;
let activePlayer = 0;

const players = [
  {
    playerName: '',
    symbol: 'X'
  },
  {
    playerName: '',
    symbol: 'O'
  }
];

const playerConfigOverlayElement = document.getElementById('player-config-overlay');
const backdropElement = document.getElementById('backdrop');

const formElement = document.querySelector('form');
const playerNameInputElement = document.querySelector('#player-name-input');
const configErrorsElement = document.querySelector('#config-form-errors');
const gamePlayElement = document.getElementById('gameplay');
const gameBoardElements = document.getElementById('game-board');
const playerTurnElement = document.getElementById('active-player-name');

const editPlayer1ButtonElement = document.getElementById('edit-player-1-btn');
const editPlayer2ButtonElement = document.getElementById('edit-player-2-btn');
const closePlayerConfigButtonElement = document.getElementById('close-player-config-btn');
const startNewGameButtonElement = document.getElementById('start-new-game-button');

editPlayer1ButtonElement.addEventListener('click', openPlayerConfig);
editPlayer2ButtonElement.addEventListener('click', openPlayerConfig);

closePlayerConfigButtonElement.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);

startNewGameButtonElement.addEventListener('click', startNewGame);

gameBoardElements.addEventListener('click', selectedGameField);