"use strict";

//gameBoard - module
const gameBoard = (() => {
  const message = document.querySelector("#message");
  const fields = document.querySelectorAll(".field");
  const restartBtn = document.querySelector("#restart-btn");
  const playerNames = document.querySelectorAll(".player-name");
  let isGameActive = true;
  let currentPlayer = "❌";
  let board = ["", "", "", "", "", "", "", "", ""];

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

  message.innerHTML = "Choose game mode";

  function showMessage() {
    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn...`;
    message.innerHTML = currentPlayerTurn();
  }

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
    playerNames.forEach((name) => (name.value = ""));
  }

  fields.forEach((field) => field.addEventListener("click", handleFieldClick));
  restartBtn.addEventListener("click", handleRestartGame);
})();

//displayController - module
const displayController = (() => {
  const modal = document.getElementById("modal");
  const form = document.querySelector("#player-name-from");
  const twoPlayerBtn = document.querySelector("#two-player-btn");
  const player1container = document.querySelector(".player1");
  const player2container = document.querySelector(".player2");

  function openModal() {
    modal.classList.add("active");
  }

  function closeModal() {
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.classList.remove("active");
        form.reset();
      }
    });
  }

  //left side
  function getPlayer1Name() {
    const playerXname = document.querySelector("#player1-name").value;
    const playerX = document.createElement("h2");
    playerX.classList.add(".player1");
    playerX.innerHTML = `❌: ${playerXname}`;
    player1container.appendChild(playerX);
    PlayerX();
  }

  //right side
  function getPlayer2Name() {
    const playerOname = document.querySelector("#player2-name").value;
    const playerO = document.createElement("h2");
    playerO.classList.add(".player2");
    playerO.innerHTML = `⭕: ${playerOname}`;
    player2container.appendChild(playerO);
    PlayerO();
  }

  twoPlayerBtn.addEventListener("click", openModal);

  return { getPlayer1Name, getPlayer2Name };
})();

//player-factory
const PlayerX = (playerXname) => {
  this.playerXname = playerXname;
  return { playerXname };
};

const PlayerO = (playerOname) => {
  this.playerOname = playerOname;
  return { playerOname };
};
