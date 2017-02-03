export default function gameLogic(state, cell){

  let newState = state
  let value = cell.value
  let x = cell.x
  let y = cell.y
  let location = newState.gameBoard.board
  let size = newState.gameBoard.board[0].length


  if(!isLegal(state, cell)){
    return state
  }

  location[x][y].value = state.whiteIsNext ? 'white' : 'black'

  newState.whiteIsNext = state.whiteIsNext ? false : true

  checkTrap(state, cell)

  return newState
}

function checkTrap(state, cell){
  let checked = [];
  let toCheck = getNeighborsOfValue(state, cell, returnOppositeColor(cell.value));

  while(toCheck.length > 0){
    if(getNeighborsOfValue(state,toCheck[0],'blank').length > 0){
      return false;
    }

    toCheck = toCheck.concat(getNeighborsOfValue(state,toCheck[0],toCheck[0].value));

    toCheck = difference(toCheck, checked);

    checked.push(toCheck.shift())

  }

return checked;

}

function getNeighborsOfValue(state, cell, value){
  let neighbors = []

  if(state.gameBoard.board[cell.x][cell.y+1].value === value){
    neighbors.push(state.gameBoard.board[cell.x][cell.y+1])
  }
  if(state.gameBoard.board[cell.x+1][cell.y].value === value){
    neighbors.push(state.gameBoard.board[cell.x+1][cell.y])
  }
  if(state.gameBoard.board[cell.x][cell.y-1].value === value){
    neighbors.push(state.gameBoard.board[cell.x][cell.y-1])
  }
  if(state.gameBoard.board[cell.x-1][cell.y].value === value){
    neighbors.push(state.gameBoard.board[cell.x-1][cell.y])
  }

  return neighbors

}

function difference(arr1, arr2){
  arr1 = arr1.concat(arr2);
  return arr1.filter(function(val){
   return arr1.indexOf(val) === arr1.lastIndexOf(val);
  });

}

function isLegal(state, cell){
  if(cell.value !== 'blank'){
    return false
  }

  return true
}

function isOppositeColor(piece,adjacentPeice){
  if(piece === 'black'){
    return adjacentPeice = 'white' ? true : false
  }
  if(piece === 'white'){
    return adjacentPeice = 'black' ? true : false
  }
}

function returnOppositeColor(value){
  if(value === 'black'){
    return 'white'
  }
  if(value === 'white'){
    return 'black'
  }
}
