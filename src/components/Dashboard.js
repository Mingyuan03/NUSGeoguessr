import React from 'react';
import './Dashboard.css';

function Dashboard({ score, onStart }) {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h1 className="dashboard-title">NUSGeoguessr</h1>
        <div className="score-display">
          <p className="score-label">Cumulative Score</p>
          <p className="score-value">{score}</p>
        </div>
        <button className="start-button" onClick={onStart}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
