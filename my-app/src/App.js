import React, { Component } from 'react'
import gameLogic from './Logic.js';

class Gamepiece {
  constructor(x,y) {
    this.x = x
    this.y = y
    this.value = 'blank'
  }
}

class GameBoard {
  constructor( size ){
    this.size = size
    this.board = []
    this.initializeBoard()
  }

  initializeBoard(){
    for(let x = 0; x < this.size; x++){
      this.board[x] = []
      for (let y = 0; y < this.size; y++){
        this.board[x][y] = new Gamepiece(x,y)
      }
    }
    return this.board
  }
}

class Board extends Component {
  constructor() {
    super();
    this.state = {
      blackScore: 0,
      whiteScore: 0,
      whiteIsNext: false,
      gameBoard: new GameBoard(19),
    };
  }

  handleClick(cell){
    this.setState(gameLogic(this.state, cell))
  }

  switchTurn(state){
    let newState = this.state
    newState.whiteIsNext ? newState.whiteIsNext = false : newState.whiteIsNext = true;
    this.setState(newState)

  }

  render() {
    let rows = this.state.gameBoard.board.map( (row,index) => {
      let cells = [];
      for (let i in row) {
        cells.push(<td key={`${row[i].x}-${row[i].y}`}>
                    <button x={row[i].x} y={row[i].y} className={row[i].value} onClick={(event) => this.handleClick(row[i])}>_</button>
                  </td>);
      }
      return <tr key={index}>{cells}</tr>;
    });

    return (
      <div>
      <table className="board">
        <tbody>{rows}</tbody>
      </table>

      <button onClick={(event) => this.switchTurn()} className='pass'>Pass</button>
      <h2>White: {this.state.whiteScore}</h2><h2>Black: {this.state.blackScore}</h2>
      </div>
    );
  }
}

export default Board;
