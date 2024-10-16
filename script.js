const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartBtn = document.querySelector('.restart');
const gameBoard = document.getElementById('game-board');
const playerForm = document.getElementById('player-form');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

let currentPlayer = 'X';
let player1Name = '';
let player2Name = '';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function formSubmit(event) {
  event.preventDefault();
  player1Name = player1Input.value;
  player2Name = player2Input.value;
  currentPlayer = player1Name;
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  playerForm.style.display = 'none';
  gameBoard.style.display = 'grid';
  restartBtn.style.display = 'inline-block';
  player.style.display = 'inline-block';
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = clickedCell.getAttribute('data-index');

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusText.textContent = 'Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  currentPlayer = player1Name;
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach((cell) => {
    cell.textContent = '';
  });

  playerForm.style.display = 'block';
  gameBoard.style.display = 'none';
  restartBtn.style.display = 'none';
  player.style.display = 'none';
}

cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
