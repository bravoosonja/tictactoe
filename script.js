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
