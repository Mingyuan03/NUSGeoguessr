import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Game from './components/Game';

function App() {
  const [gameState, setGameState] = useState('dashboard'); // 'dashboard' or 'playing'
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setGameState('playing');
  };

  const handleGameEnd = () => {
    setGameState('dashboard');
  };

  const handleScoreUpdate = (points) => {
    setScore(prevScore => prevScore + points);
  };

  return (
    <div className="App">
      {gameState === 'dashboard' ? (
        <Dashboard score={score} onStart={handleStart} />
      ) : (
        <Game onGameEnd={handleGameEnd} onScoreUpdate={handleScoreUpdate} />
      )}
    </div>
  );
}

export default App;
