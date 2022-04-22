
const message = document.querySelector("#message");

let gameActive = true;
let currentPlayer = "❌";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's Player ${currentPlayer}'s turn...`;

message.innerHTML = currentPlayerTurn();

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

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
  message.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    message.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    message.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "❌";
  gameState = ["", "", "", "", "", "", "", "", ""];
  message.innerHTML = currentPlayerTurn();
  document
    .querySelectorAll(".field")
    .forEach((field) => (field.innerHTML = ""));
}

document
  .querySelectorAll(".field")
  .forEach((field) => field.addEventListener("click", handleCellClick));
document
  .querySelector("#restart-btn")
  .addEventListener("click", handleRestartGame);
=======
//module
const gameBoard = (() => {
  const fields = Array.from(document.querySelectorAll(".field"));
  let board = ["", "", "", "", "", "", "", "", ""];
  let isGameActive = true;

  const winnigConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isValidAction = (field) => {
    if (field.innerText === "❌" || field.innerText === "⭕") {
      return false;
    }
    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };
})();

//factory
function Player = (name, marker) => {
  this.name = name;
  this.marker = marker;

  const getPlayerName = () => { 
    const player1Name = document.getElementById('player1-name').value();
    const player2Name = document.getElementById('player2-name').value();
    return { player1Name, player2Name };
  };


  let currentPlayer = "❌";
  const changePlayer = () => {
    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
    return currentPlayer;
  }
  return { currentPlayer };
};

//module
const displayController = (() => {
  const restartBtn = document.getElementById("restart-btn");
  const message = document.querySelector("#message");

  const winMessage = () => {
    `Player ${Player.currentPlayer()} has won!`;
  };
  const drawMessage = () => {
    `Game ended in a draw!`;
  };
  const currentPlayerTurn = () => {
    `Player ${Player.currentPlayer()}'s turn`;
  };

  message.textContent = currentPlayerTurn();

  restartBtn = addEventListener("click", Board.resetBoard());
})();
