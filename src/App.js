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

  function checkForWinner(){
    const winningRows = [
      [0 ,1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],

    ];
    for (let i = 0; i < winningRows.length; i++){
      const [a,b,c] = winningRows[i];
      if(gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]){
        return gameState[a];
      }
    }
    return null;
  }
  const winner = checkForWinner();
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else{
    status = `Next Player: ${currentPlayer}`;
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
