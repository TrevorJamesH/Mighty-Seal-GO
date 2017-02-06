export default function gameLogic(state, cell){

  let newState = state
  let location = newState.gameBoard.board

  if(!isLegal(state, cell)){
    return state
  }

  location[cell.x][cell.y].value = state.whiteIsNext ? 'white' : 'black'

  newState.whiteIsNext = state.whiteIsNext ? false : true

  let oppositeNeighbors = getNeighborsOfValue(state, cell, returnOppositeColor(cell.value))

  for (let i=0; i < oppositeNeighbors.length; i++){
    score(state, checkTrap(state, oppositeNeighbors[i]));
  }

  return newState
}

function checkTrap(state, cell){
  let checked = [];
  let toCheck = [];
  let trapped = [];
  toCheck.push(cell)

  while(toCheck.length > 0){
    if(getNeighborsOfValue(state,toCheck[0],'blank').length > 0){
      return [];
    }

    toCheck = toCheck.concat(getNeighborsOfValue(state,toCheck[0],cell.value));

    toCheck = difference(toCheck, checked);

    checked.push(toCheck.shift())

  }

return checked;

}

function score(state, erase){
  state.whiteIsNext
  ? state.blackScore += erase.length
  : state.whiteScore += erase.length

  wipe(state, erase);
}

function wipe(state, erase){
  for(let i=0;i < erase.length;i++){
    erase[i].value = 'blank'
  }
}

function getNeighborsOfValue(state, cell, value){
  let neighbors = []
  let x = cell.x
  let y = cell.y
  let board = state.gameBoard.board

  if(board[x][y+1]){
    if(board[x][y+1].value === value){
      neighbors.push(board[x][y+1])
    }
  }
  if(board[x+1]){
    if(board[x+1][y].value === value){
      neighbors.push(board[x+1][y])
    }
  }
  if(board[x][y-1]){
    if(board[x][y-1].value === value){
      neighbors.push(board[x][y-1])
    }
  }
  if(board[x-1]){
    if(board[x-1][y].value === value){
      neighbors.push(board[x-1][y])
    }
  }
  return neighbors

}

function difference(arr1, arr2){
  let newArr = []
  for(let i=0;i<arr1.length;i++){
    if(!arr2.includes(arr1[i])){
      newArr.push(arr1[i])
    }
  }
  return newArr
}

function isLegal(state, cell){
  if(cell.value !== 'blank'){
    return false
  }
  cell.value = state.whiteIsNext ? 'white' : 'black'
  if(checkTrap(state, cell).includes(cell)){


    let oppositeNeighbors = getNeighborsOfValue(state, cell, state.whiteIsNext ? 'black' : 'white')
    let trappedNeighbors = [];

    for (let i=0; i < oppositeNeighbors.length; i++){
      trappedNeighbors = trappedNeighbors.concat(checkTrap(state, oppositeNeighbors[i]));
    }

    cell.value = 'blank'

    if(trappedNeighbors.length > 0){
      return true
    }

    return false
  }
  return true
}

function returnOppositeColor(value){
  if(value === 'black'){
    return 'white'
  }
  if(value === 'white'){
    return 'black'
  }
}
