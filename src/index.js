import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
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

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const dimension = this.props.dimension;
    let board = []
    let id = 0;
    for (let c = 1; c <= dimension; c++) {
      let row = [];
      for (let r = 1; r <= dimension; r++) {
        row.push(this.renderSquare(id++));
      }
      board.push(<div className="board-row">{row}</div>);
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
      dimension: 4 // number of squares per side
    };
  }

  handleClick(i) {
    const current = this._buildHistory(this.state.history);

    if (calculateWinner(current) || current[i]) {
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
    const winner = calculateWinner(current);

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
      status = 'Winner: ' + winner;
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
            onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul className="nolist">{moves}</ul>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const dimension = Math.sqrt(squares.length);

  // check each row
  for (let row = 0; row < dimension; row++) {
    const cells = squares.slice(row * dimension, (row * dimension) + dimension);
    if (cells[0] && cells.every(v => v === cells[0])) {
      return cells[0];
    }
  }

  // check each column
  for (let col = 0; col < dimension; col++) {
    const cells = squares.filter((element, index) => {
      return index % dimension === col;
    });
    if (cells[0] && cells.every(v => v === cells[0])) {
      return cells[0];
    }
  }

  // check both diagonals
  const ltor = squares.filter((e, i) => {
    return i % (dimension + 1) === 0;
  });
  if (ltor[0] && ltor.every(v => v === ltor[0])) {
    return ltor[0];
  }

  const rtol = squares.filter((e, i) => {
    return i % (dimension - 1) === 0 && i > 0 && i < squares.length - 1;
  })
  if (rtol[0] && rtol.every(v => v === rtol[0])) {
    return rtol[0];
  }

  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
