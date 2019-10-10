import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

<<<<<<< HEAD
function Square(props){
  return(
    <button
      className="square"
=======
function Square(props) {
  return (
    <button
      className={'square ' + props.winning} 
>>>>>>> history-as-events
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
<<<<<<< HEAD
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  renderSquare(i) {
=======
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(props.dimension * props.dimension).fill(null),
    };
  }

  renderSquare(i, isWinner) {
>>>>>>> history-as-events
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
<<<<<<< HEAD
=======
        winning = {isWinner ? 'winning' : ''}
        i={i}
>>>>>>> history-as-events
      />
    );
  }

  render() {
<<<<<<< HEAD
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
=======
    const dimension = this.props.dimension;
    const winner = this.props.winner || [];

    let board = new Array(dimension);
    let id = 0;
    for (let c = 0; c < dimension; c++) {
      let row = new Array(dimension);
      for (let r = 0; r < dimension; r++) {
        const currid = id++;
        row[r] = this.renderSquare(currid, winner.some(v => v === currid));
      }
      board[c] = <div className="board-row">{row}</div>;
    }


    return (
      <div>
        {board}
>>>>>>> history-as-events
      </div>
    );
  }
}

class Game extends React.Component {
<<<<<<< HEAD
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
=======
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      dimension: 3 // number of squares per side
    };
    this.winningConditions = getWinningConditions(this.state.dimension);
  }

  handleClick(i) {
    const current = this._buildHistory(this.state.history);

    if (current[i] || calculateWinner(current, this.winningConditions)) {
      return;
    }

    this.setState({
      history: this.state.history.concat({
        square: i,
        place: (this.state.history.length % 2 === 0 ? 'X' : 'O')
      })
    });
  }

  jumpTo(step) {
    this.setState({
      history: this.state.history.slice(0, step)
    });
  }

  _buildHistory(history) {
    const current = Array(this.state.dimension * this.state.dimension).fill(null);

    for (let i = 0; i < history.length; i++) {
      current[history[i].square] = history[i].place;
    }

    return current;
  }

  render() {
    const history = this.state.history;
    const maxMoves = this.state.dimension * this.state.dimension;
    const current = this._buildHistory(history);
    const winner = calculateWinner(current, this.winningConditions);

    const moves = history.map((step, move) => {
      const desc = 'Undo #' + (move + 1) + ': ' + step.place + ' on (' + Math.floor((step.square / this.state.dimension) + 1) + ',' + (step.square % this.state.dimension + 1) + ')';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
>>>>>>> history-as-events
    });

    let status;
    if (winner) {
<<<<<<< HEAD
      status = 'Winner: ' + winner;
    }else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
=======
      status = 'Winner: ' + current[winner[0]];
    } else if (history.length === 0) {
      status = 'Player X starts';
    } else if (history.length >= maxMoves) {
      status = 'It\'s a Draw!';
    } else {
      status = 'Next player: ' + (history.length % 2 === 0 ? 'X' : 'O');
>>>>>>> history-as-events
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
<<<<<<< HEAD
            squares={current.squares}
            onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
=======
            squares={current}
            dimension={this.state.dimension}
            onClick={(i) => this.handleClick(i)}
            winner={winner} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul className="nolist">{moves}</ul>
>>>>>>> history-as-events
        </div>
      </div>
    );
  }
}

<<<<<<< HEAD
function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
=======
function getWinningConditions(dimension){
  let winningConditions = new Array(dimension * 2 + 2);

  for (let row = 0; row < dimension; row++) {
    winningConditions[row] = Array.from({ length: dimension }, (e, i) => i + (row * dimension));
  }
  for (let col = 0; col < dimension; col++) {
    winningConditions[dimension + col] = Array.from({ length: dimension }, (e, i) => col + (i * dimension));
  }
  winningConditions[dimension * 2] = Array.from({ length: dimension }, (e, i) => i * (dimension + 1));
  winningConditions[dimension * 2 + 1] = Array.from({ length: dimension }, (e, i) => (i + 1) * (dimension - 1));

  return winningConditions;
}

function calculateWinner(squares, winningConditions) {
  for (let ix = 0; ix < winningConditions.length; ix++) {
    const win = winningConditions[ix];
    if (squares[win[0]] && win.every(val => squares[win[0]] === squares[val])) {
      return win;
    }
  }

>>>>>>> history-as-events
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
