//module
const gameBoard = (() => {
  let board = [...Array(9).keys()];
  
  const getField = (board) => { 
    return board.keys;
  }

  const setField = (board, Player) => {   
    board.value() = Player.marker;
  };
  
  const resetField = () => { 
    for (i = 0; i < board.length; i++) { 
      board[i].values() = undefined;
    }
  }
  return { getField, setField, resetField };
})();

//factory
function Player = (name, marker) => {
  const name = this.name;
  const marker = this.marker;
  return { name, marker };
};

const getPlayer = () => { 
  document.getElementById("")

}

const setPlayer = () => { 

}

//module
const displayController = (() => {})();







