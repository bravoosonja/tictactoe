//module
const gameBoard = (() => {
  const message = document.getElementById("message");
  const restartBtn = document.getElementById("restart-btn");
  const fields = document.querySelectorAll(".field");

  let board = ["", "", "", "", "", "", "", "", ""];
  let isGameActive = true;
  let currentPlayer = "❌";

  const winMessage = () => `Player ${currentPlayer} has won!`;
  const drawMessage = () => `Game ended in a draw!`;
  const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

  message.textContent = currentPlayerTurn();

  const handleFieldClick = (clickedFieldEvent) => {
    const clickedField = clickedFieldEvent.target;
    const clickedFieldIndex = parseInt(clickedField.getAttribute("data-index"));

    if (board[clickedFieldIndex] !== "" || !isGameActive) {
      return;
    }
    handleFieldPlayed(clickedField, clickedFieldIndex);
    validateResult();
  };

  const handleFieldPlayed = (clickedField, clickedFieldIndex) => {
    board[clickedFieldIndex] = currentPlayer;
    clickedField.innerHTML = currentPlayer;
  };

  const validateResult = () => {
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

    let roundWon = false;
    for (i = 0; i <= 7; i++) {
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
      message.innerHTML = winMessage();
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
  };

  const handlePlayerChange = (currentPlayer) => {
    currentPlayer === "❌" ? "⭕" : "❌";
    message.innerHTML = currentPlayerTurn();
    handleFieldPlayed();
  };

  const restartGame = () => {
    isGameActive = true;
    currentPlayer = "x";
    board = ["", "", "", "", "", "", "", "", ""];
    message.innerHTML = currentPlayerTurn();
    fields.forEach((field) => (field.innerHTML = ""));
  };

  fields.forEach((field) => field.addEventListener("click", handleFieldClick));
  restartBtn.addEventListener("click", restartGame);
})();

//factory
const Player = function (name, marker) {
  this.name = name;
  this.marker = marker;
  this.CurrentPlayer = Player.marker.value("x");
  console.log(currentPlayer);
};

//module
const displayController = (() => {})();
