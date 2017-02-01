import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css';

class Board extends Component {
  constructor() {
    super();
    this.size = 9;
    this.state = {

      // wIsNext: true,
      board: this.createGameBoard(this.size),

    };
  }

  createGameBoard(size){
    let gameBoard = [];
      for(let x = 0; x < size; x++){
        gameBoard[x] = []
        for (let y = 0; y < size; y++){
          gameBoard[x][y] = ['Y:',y,',','X:',x]
        }
    }

    return gameBoard
  }

  handleClick(x,y) {
    const squares = this.state.squares.slice();

    squares[x][y] = this.state.wIsNext ? 'W' : 'B';
    this.setState({
      squares: squares,
      wIsNext: !this.state.wIsNext,
    });
  }


  render() {

    let rows = this.state.board.map(function(row) {
      let cells = [];
      for (let i in row) {
        cells.push(<button>{row[i]}</button>);
      }
      return <tr>{cells}</tr>;
    });


    return (
      <table className="MyClassName">
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default Board;
