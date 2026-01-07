import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Game from './components/Game';
import ScoreHistory from './components/ScoreHistory';

function App() {
  const [gameState, setGameState] = useState('dashboard'); // 'dashboard' or 'playing'
  const [score, setScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [roundNumber, setRoundNumber] = useState(1);

  const handleStart = () => {
    setGameState('playing');
  };

  const handleGameEnd = () => {
    setGameState('dashboard');
    setRoundNumber(prev => prev + 1);
  };

  const handleScoreUpdate = (points) => {
    setScore(prevScore => prevScore + points);
    setScoreHistory(prevHistory => [
      ...prevHistory,
      {
        round: roundNumber,
        points: points
      }
    ]);
  };

  return (
    <div className="App">
      {gameState === 'playing' && (
        <ScoreHistory scoreHistory={scoreHistory} />
      )}
      {gameState === 'dashboard' ? (
        <Dashboard score={score} onStart={handleStart} />
      ) : (
        <Game onGameEnd={handleGameEnd} onScoreUpdate={handleScoreUpdate} />
      )}
    </div>
  );
}

export default App;
