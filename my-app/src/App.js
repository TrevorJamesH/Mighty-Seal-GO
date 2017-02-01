import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css';



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
        this.board[x][y] = new Gamepeice(x,y)
      }
    }
    return this.board
  }
}

class Gamepeice {
  constructor(x,y) {
    this.x = x
    this.y = y
    this.value = 'blank'
  }
}

class Board extends Component {
  constructor() {
    super();
    this.state = {
      wIsNext: true,
      gameBoard: new GameBoard(19),
    };
  }

  handleClick(event,cell) {
    console.log(cell)
    let newState = this.state
    let value = newState.gameBoard.board[cell.x][cell.y].value
    if( value === 'blank' || value === 'white'){
      newState.gameBoard.board[cell.x][cell.y].value = 'black'
      this.setState(newState)
    }
    if( value === 'blank' || value === 'black'){
      newState.gameBoard.board[cell.x][cell.y].value = 'white'
      this.setState(newState)
    }
  }

  render() {
    let rows = this.state.gameBoard.board.map( (row,index) => {
      let cells = [];
      for (let i in row) {
        cells.push(<td key={`${row[i].x}-${row[i].y}`}>
                    <button x = {row[i].x} y = {row[i].y} className={row[i].value} onClick={(event) => this.handleClick(event,row[i])}></button>
                  </td>);
      }
      return <tr key={index}>{cells}</tr>;
    });

    return (
      <table className="board">
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default Board;
