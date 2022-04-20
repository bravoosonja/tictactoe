//module
const gameBoard = (() => {
  let board = [...Array(8).keys()];
  
  const _getField = () => { 
    if (index > board.length) return;
    return board[index];
  }

  const _setField = (index, marker) => {   
    if (index > board.length) return;
    board[index] = marker;
  };
  
  const _resetField = () => { 
    for (i = 0; i < board.length; i++) { 
      board[i].values() = null;
    }
  }
})();

//module
const displayController = (() => {})();

//factory
const Player = (name, marker) => {
  const name = this.name;
  const marker = this.marker;
  return { name, marker };
};





