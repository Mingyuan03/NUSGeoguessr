import React from 'react';
import './Timer.css';

function Timer({ timeRemaining }) {
  const getTimerColor = () => {
    if (timeRemaining > 10) return '#4caf50';
    if (timeRemaining > 5) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="timer-container">
      <div 
        className="timer-circle"
        style={{ 
          '--timer-color': getTimerColor(),
          '--progress': (timeRemaining / 20) * 100
        }}
      >
        <span className="timer-text">{timeRemaining}s</span>
      </div>
    </div>
  );
}

export default Timer;
