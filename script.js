"use strict";
//player - factory
const player = (marker) => {
  this.marker = marker;
  const getMarker = () => {
    return marker;
  };
  return { getMarker };
};

//gameBoard - module
const gameBoard = (() => {})();
//displayController - module
const displayController = (() => {})();

const message = document.querySelector("#message");
const fields = document.querySelectorAll(".field");
const restartBtn = document.querySelector("#restart-btn");

let isGameActive = true;
let currentPlayer = "❌";
let board = ["", "", "", "", "", "", "", "", ""];

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

function handleFieldPlayed(clickedField, clickedFieldIndex) {
  board[clickedFieldIndex] = currentPlayer;
  clickedField.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
  message.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = board[winCondition[0]];
    let b = board[winCondition[1]];
    let c = board[winCondition[2]];
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
    isGameActive = false;
    return;
  }

  let roundDraw = !board.includes("");
  if (roundDraw) {
    message.innerHTML = drawMessage();
    isGameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleFieldClick(clickedFieldEvent) {
  const clickedField = clickedFieldEvent.target;
  const clickedFieldIndex = parseInt(clickedField.getAttribute("data-index"));

  if (board[clickedFieldIndex] !== "" || !isGameActive) {
    return;
  }

  handleFieldPlayed(clickedField, clickedFieldIndex);
  handleResultValidation();
}

function handleRestartGame() {
  isGameActive = true;
  currentPlayer = "❌";
  board = ["", "", "", "", "", "", "", "", ""];
  message.innerHTML = currentPlayerTurn();
  fields.forEach((field) => (field.innerHTML = ""));
}

fields.forEach((field) => field.addEventListener("click", handleFieldClick));
restartBtn.addEventListener("click", handleRestartGame);
