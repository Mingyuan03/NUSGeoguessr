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

function Game({ onGameEnd, onScoreUpdate }) {
  const [gameState, setGameState] = useState('countdown'); // 'countdown', 'playing', 'confirming'
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [actualLocation] = useState(KENT_RIDGE_CENTER); // For now, using center as dummy actual location

  useEffect(() => {
    if (gameState === 'playing' && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'playing' && timeRemaining === 0) {
      // Time's up - auto-submit
      handleConfirm();
    }
  }, [gameState, timeRemaining]);

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
      onScoreUpdate(score);
      onGameEnd();
    }
  };

  const handleCancel = () => {
    setSelectedLocation(null);
    setGameState('playing');
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

  if (gameState === 'countdown') {
    return <Countdown onComplete={handleCountdownComplete} />;
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <Timer timeRemaining={timeRemaining} />
      </div>
      
      <div className="game-content">
        <div className="image-container">
          <img src={dummyImage} alt="NUS Location" className="location-image" />
        </div>
        
        <div className="map-container">
          <GameMap
            center={KENT_RIDGE_CENTER}
            selectedLocation={selectedLocation}
            onMapClick={handleMapClick}
            disabled={gameState !== 'playing'}
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
    </div>
  );
}

export default Game;
