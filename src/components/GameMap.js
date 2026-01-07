import React, { useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Kent Ridge campus bounds (approximate)
const kentRidgeBounds = {
  north: 1.3100,
  south: 1.2830,
  east: 103.7900,
  west: 103.7630
};

const libraries = ['places'];

function GameMap({ center, selectedLocation, actualLocation, onMapClick, disabled, showResults }) {
  const mapRef = useRef(null);

  // You'll need to add your Google Maps API key here
  // For now, using a placeholder - you'll need to set REACT_APP_GOOGLE_MAPS_API_KEY in .env
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    // Restrict map to Kent Ridge campus bounds
    map.setOptions({
      restriction: {
        latLngBounds: kentRidgeBounds,
        strictBounds: true
      },
      minZoom: 15,
      maxZoom: 20
    });
  }, []);

  const handleMapClick = (e) => {
    if (!disabled && e.latLng) {
      onMapClick({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  };

  if (!isLoaded) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f0f0f0'
      }}>
        <p>Loading map...</p>
        {!process.env.REACT_APP_GOOGLE_MAPS_API_KEY && (
          <p style={{ fontSize: '0.8rem', marginTop: '10px', color: '#666', textAlign: 'center', padding: '0 20px' }}>
            Note: Google Maps API key required. See README for setup instructions.
          </p>
        )}
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onLoad={onMapLoad}
      onClick={handleMapClick}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        draggable: !disabled,
        clickableIcons: false,
        cursor: disabled ? 'default' : 'crosshair'
      }}
    >
      {/* User's guess marker (red arrow) */}
      {selectedLocation && (
        <Marker
          position={selectedLocation}
          icon={{
            path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
            fillColor: '#FF0000',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
            scale: 1.5,
            anchor: new window.google.maps.Point(0, -30)
          }}
          label={showResults ? {
            text: 'Your Guess',
            color: '#FF0000',
            fontWeight: 'bold',
            fontSize: '12px'
          } : undefined}
        />
      )}
      
      {/* Actual location marker (green pin) */}
      {actualLocation && showResults && (
        <Marker
          position={actualLocation}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#4CAF50',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 3,
            scale: 10
          }}
          label={{
            text: 'Actual Location',
            color: '#4CAF50',
            fontWeight: 'bold',
            fontSize: '12px'
          }}
        />
      )}
    </GoogleMap>
  );
}

export default GameMap;
