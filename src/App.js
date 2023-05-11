import React, { useState } from 'react';
import './App.css';

function Gameboard({ currentPlayer, setCurrentPlayer }) {
  const [gameState, setGameState] = useState(Array(9).fill(null));

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {gameState[i]}
      </button>
    );
  }

  function handleClick(i) {
    if (gameState[i] === null) {
      const newGameState = [...gameState];
      newGameState[i] = currentPlayer;
      setGameState(newGameState);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
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

  return (
    <div className="game">
      <div className="game-board">
        <Gameboard currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} />
      </div>
      <div className="game-info">
        <Player name="Player 1" mark="X" />
        <Player name="Player 2" mark="O" />
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
