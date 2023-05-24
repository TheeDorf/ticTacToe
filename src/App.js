import React, { useState } from 'react';
import './App.css';


function Gameboard({ currentPlayer, setCurrentPlayer, winner, setWinner }) {
  const [gameState, setGameState] = useState(Array(9).fill(null));

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {gameState[i]}
      </button>
    );
  }

  function handleClick(i) {
    if (gameState[i] === null && winner === null) {
      const newGameState = [...gameState];
      newGameState[i] = currentPlayer;
      setGameState(newGameState);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      checkWinner();
    }
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        setWinner(gameState[a]);
        return;
      }
    }

    if (!gameState.includes(null)) {
      setWinner('Draw');
    }
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Player({ name, mark }) {
  return (
    <div className="Player">
      <h2>{name}</h2>
      <p>{mark}</p>
    </div>
  );
}

function Game() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  return (
    <div className="game">
      <div className="game-board">
      <Gameboard
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          winner={winner} 
          setWinner={setWinner}
        />
      </div>
      <div className="game-info">
        <Player name="Player 1" mark="X" />
        <Player name="Player 2" mark="O" />
        {winner && (
          <div className="winner-message">
            {winner === 'Draw' ? 'It\'s a draw!' : `Player ${winner} wins!`}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <Game />
    </div>
  );
}

export default App;