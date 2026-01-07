import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import GameMap from './GameMap';
import Timer from './Timer';
import './Game.css';
import dummyImage from '../assets/dummy-location.svg';

// Kent Ridge campus center coordinates
const KENT_RIDGE_CENTER = {
  lat: 1.2966,
  lng: 103.7764
};

// Utility functions
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  // Haversine formula to calculate distance in meters
  const R = 6371000; // Earth's radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const calculateScore = (guess, actual) => {
  // Linear scoring algorithm based on distance
  // Maximum score: 5000 points
  // Score decreases linearly with distance
  const distance = calculateDistance(guess.lat, guess.lng, actual.lat, actual.lng);
  const maxDistance = 2000; // meters (approximately 2km radius of Kent Ridge)
  const score = Math.max(0, Math.floor(5000 * (1 - distance / maxDistance)));
  return score;
};

function Game({ onGameEnd, onScoreUpdate }) {
  const [gameState, setGameState] = useState('countdown'); // 'countdown', 'playing', 'confirming', 'results'
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [actualLocation] = useState(KENT_RIDGE_CENTER); // For now, using center as dummy actual location
  const [showResults, setShowResults] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    if ((gameState === 'playing' || gameState === 'confirming') && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if ((gameState === 'playing' || gameState === 'confirming') && timeRemaining === 0 && !showResults) {
      // Time's up - auto-submit with current guess or 0 score
      if (selectedLocation) {
        const score = calculateScore(selectedLocation, actualLocation);
        setFinalScore(score);
        onScoreUpdate(score);
      } else {
        // No guess made - 0 points
        setFinalScore(0);
        onScoreUpdate(0);
      }
      setShowResults(true);
      setGameState('results');
    }
  }, [gameState, timeRemaining, showResults, selectedLocation, actualLocation, onScoreUpdate]);

  const handleCountdownComplete = () => {
    setGameState('playing');
  };

  const handleMapClick = (location) => {
    if (gameState === 'playing') {
      setSelectedLocation(location);
      setGameState('confirming');
    }
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      const score = calculateScore(selectedLocation, actualLocation);
      setFinalScore(score);
      onScoreUpdate(score);
      setShowResults(true);
      setGameState('results');
    }
  };

  const handleContinue = () => {
    // After showing results, return to dashboard
    onGameEnd();
  };

  const handleCancel = () => {
    setSelectedLocation(null);
    setGameState('playing');
  };


  if (gameState === 'countdown') {
    return <Countdown onComplete={handleCountdownComplete} />;
  }

  return (
    <div className="game-container">
      {!showResults && (
        <div className="game-header">
          <Timer timeRemaining={timeRemaining} />
        </div>
      )}
      
      <div className="game-content">
        <div className="image-container">
          <img src={dummyImage} alt="NUS Location" className="location-image" />
        </div>
        
        <div className="map-container">
          <GameMap
            center={KENT_RIDGE_CENTER}
            selectedLocation={selectedLocation}
            actualLocation={showResults ? actualLocation : null}
            onMapClick={handleMapClick}
            disabled={gameState !== 'playing'}
            showResults={showResults}
          />
        </div>
      </div>

      {gameState === 'confirming' && (
        <div className="confirm-panel">
          <p>Location selected! Click Confirm to submit your guess.</p>
          <div className="confirm-buttons">
            <button className="confirm-button" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showResults && (
        <div className="results-panel">
          <div className="results-content">
            <h2>Round Complete!</h2>
            <div className="results-score">
              <p className="results-score-label">Your Score</p>
              <p className="results-score-value">{finalScore} points</p>
            </div>
            <div className="results-markers">
              <div className="marker-info">
                <span className="marker-dot marker-actual"></span>
                <span>Actual Location</span>
              </div>
              {selectedLocation && (
                <div className="marker-info">
                  <span className="marker-dot marker-guess"></span>
                  <span>Your Guess</span>
                </div>
              )}
              {!selectedLocation && (
                <div className="marker-info">
                  <span className="marker-dot marker-no-guess"></span>
                  <span>No guess made (time ran out)</span>
                </div>
              )}
            </div>
            <button className="continue-button" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
