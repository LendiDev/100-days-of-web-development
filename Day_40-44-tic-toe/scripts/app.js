
// creates matrix 3x3 filled with 0's
const gameData = Array.from({ length: 3 }, () => Array(3).fill(0));

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;

let players = [
  {
    playerName: '-',
    symbol: 'X'
  },
  {
    playerName: '-',
    symbol: 'O'
  }
];

const playerConfigOverlayElement = document.getElementById('player-config-overlay');
const playerResetOverlayElement = document.getElementById('player-reset-overlay');
const backdropElement = document.getElementById('backdrop');

const formElement = document.querySelector('#form-edit-player');
const resetFormElement = document.querySelector('#form-reset-player');

const playerNameInputElement = document.querySelector('#player-name-input');
const configErrorsElement = document.querySelector('#config-form-errors');
const gamePlayElement = document.getElementById('gameplay');
const gameBoardElement = document.getElementById('game-board');
const playerTurnTextElement = document.getElementById('player-turn-text');
const playerNameTurnElement = document.getElementById('active-player-name');
const gameOverElement = document.getElementById('game-over');
const errorNewGameElement = document.querySelector('#game-config p.error');

const editPlayer1ButtonElement = document.getElementById('edit-player-1-btn');
const editPlayer2ButtonElement = document.getElementById('edit-player-2-btn');
const resetPlayer1ButtonElement = document.getElementById('reset-player-1-btn');
const resetPlayer2ButtonElement = document.getElementById('reset-player-2-btn');
const closePlayerConfigButtonElement = document.getElementById('close-player-config-btn');
const closePlayerResetButtonElement = document.getElementById('close-player-reset-btn');
const startNewGameButtonElement = document.getElementById('start-new-game-button');

editPlayer1ButtonElement.addEventListener('click', openPlayerConfig);
editPlayer2ButtonElement.addEventListener('click', openPlayerConfig);

resetPlayer1ButtonElement.addEventListener('click', openPlayerResetWarning);
resetPlayer2ButtonElement.addEventListener('click', openPlayerResetWarning);

closePlayerConfigButtonElement.addEventListener('click', closePlayerConfig);
closePlayerResetButtonElement.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);
resetFormElement.addEventListener('submit', resetPlayerConfig);

startNewGameButtonElement.addEventListener('click', startNewGame);

gameBoardElement.addEventListener('click', selectedGameField);

initConfig();