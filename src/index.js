import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className={'square ' + props.winning} 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(props.dimension * props.dimension).fill(null),
    };
  }

  renderSquare(i, isWinner) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winning = {isWinner ? 'winning' : ''}
        i={i}
      />
    );
  }

  render() {
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
      </div>
    );
  }
}

class Game extends React.Component {
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
    });

    let status;
    if (winner) {
      status = 'Winner: ' + current[winner[0]];
    } else if (history.length === 0) {
      status = 'Player X starts';
    } else if (history.length >= maxMoves) {
      status = 'It\'s a Draw!';
    } else {
      status = 'Next player: ' + (history.length % 2 === 0 ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current}
            dimension={this.state.dimension}
            onClick={(i) => this.handleClick(i)}
            winner={winner} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul className="nolist">{moves}</ul>
        </div>
      </div>
    );
  }
}

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

  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
