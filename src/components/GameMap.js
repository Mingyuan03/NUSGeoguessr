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

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!isLoaded) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f0f0f0',
        padding: '20px'
      }}>
        {!apiKey ? (
          <>
            <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#d32f2f', marginBottom: '10px' }}>
              Google Maps API Key Required
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666', textAlign: 'center', marginBottom: '20px' }}>
              To use the map feature, you need to set up a Google Maps API key.
            </p>
            <div style={{ 
              background: '#fff3cd', 
              border: '1px solid #ffc107', 
              borderRadius: '8px', 
              padding: '15px', 
              maxWidth: '500px',
              fontSize: '0.85rem',
              color: '#856404'
            }}>
              <p style={{ margin: '0 0 10px 0', fontWeight: '600' }}>Quick Setup:</p>
              <ol style={{ margin: '0', paddingLeft: '20px', textAlign: 'left' }}>
                <li>Create a <code style={{ background: '#f0f0f0', padding: '2px 4px', borderRadius: '3px' }}>.env</code> file in the project root</li>
                <li>Add: <code style={{ background: '#f0f0f0', padding: '2px 4px', borderRadius: '3px' }}>REACT_APP_GOOGLE_MAPS_API_KEY=your_key_here</code></li>
                <li>Get your API key from <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>Google Cloud Console</a></li>
                <li>Enable "Maps JavaScript API" in your project</li>
                <li>Restart the dev server (npm start)</li>
              </ol>
              <p style={{ margin: '10px 0 0 0', fontSize: '0.8rem' }}>
                See README.md for detailed instructions.
              </p>
            </div>
          </>
        ) : (
          <p>Loading map...</p>
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
