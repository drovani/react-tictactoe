import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return(
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(props.numSquares).fill(null),
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
    const dimension = Math.sqrt(this.props.numSquares) + 1;
    let board = []
    let id = 0;
    for(let c = 1; c < dimension; c++){
      let row = [];
      for (let r = 1; r < dimension; r++){
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
  constructor(props){
    super(props);
    this.state = {
      history: [],
      numSquares: 9
    };
  }

  handleClick(i){
    const current = this._buildHistory(this.state.history);

    if (calculateWinner(current) || current[i]){
      return;
    }

    this.setState({
      history: this.state.history.concat({
        square: i,
        place: (this.state.history.length % 2 === 0 ? 'X' : 'O')
      })
    });
  }

  jumpTo(step){
    this.setState({
      history: this.state.history.slice(0, step)
    });
  }

  _buildHistory(history){
    const current = Array(this.numSquares).fill(null);
    
    for(let i = 0; i < history.length; i++){
      current[history[i].square] = history[i].place;
    }

    return current;
  }  

  render() {
    const history = this.state.history;
    const current = this._buildHistory(history);
    const winner = calculateWinner(current);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Restart game';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }else if (history.length >= this.state.numSquares){
      status = 'It\'s a Draw!';
    }else {
      status = 'Next player: ' + (history.length % 2 === 0 ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current}
            numSquares={this.state.numSquares}
            onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

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
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
