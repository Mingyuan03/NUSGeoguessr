import React from 'react';
import './ScoreHistory.css';

function ScoreHistory({ scoreHistory }) {
  if (!scoreHistory || scoreHistory.length === 0) {
    return null;
  }

  return (
    <div className="score-history">
      <div className="score-history-header">
        <h3>Recent Scores</h3>
      </div>
      <div className="score-history-list">
        {scoreHistory.slice(-5).reverse().map((entry, index) => (
          <div key={index} className="score-history-item">
            <span className="score-history-round">Round {entry.round}</span>
            <span className="score-history-points">+{entry.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreHistory;
