# NUSGeoguessr - AI Agent Context

## Project Overview

NUSGeoguessr is a web-based geography guessing game inspired by Geoguessr, but focused exclusively on locations within the National University of Singapore (NUS) campus. Players are dropped into a random NUS location and must identify their position on an interactive map.

## Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Styling**: CSS
- **Maps**: Google Maps API (@react-google-maps/api)

## Project Structure

```text
NUSGeoguessr/
├── public/           # Static assets (images, favicon, index.html)
├── src/
│   ├── assets/       # Image assets (location images)
│   ├── components/   # Reusable React components
│   │   ├── Dashboard.js      # Main dashboard with score and start button
│   │   ├── Game.js           # Main game component
│   │   ├── GameMap.js         # Google Maps integration
│   │   ├── Countdown.js       # 3-second countdown
│   │   ├── Timer.js           # 20-second game timer
│   │   └── ScoreHistory.js    # Score history display (upper-right corner)
│   ├── App.js        # Main App component (manages game state and score)
│   └── index.js      # Entry point
```

## Coding Conventions

- Use functional components with hooks (no class components)
- Use ES6+ features (arrow functions, destructuring, etc.)
- Component files: PascalCase (e.g., `GameMap.js`)
- Utility files: camelCase (e.g., `calculateDistance.js`)
- CSS files: Match component name (e.g., `GameMap.css`)

## Domain Knowledge

- **NUS Campus**: Multiple campuses (Kent Ridge, Bukit Timah, Outram Park)
- **Key Locations**: Faculties, libraries, residential colleges, landmarks
- **Coordinates**: NUS locations use specific lat/long coordinates
- **Game Mechanics**:
  - Players view panoramic/street view imagery
  - Guess location on interactive map (Kent Ridge campus only)
  - Score based on distance from actual location (linear algorithm, max 5000 points)
  - Round ends on **Confirm** or automatically when the timer hits **0s**
  - Results show **actual location** + **user guess** markers on the map
  - Score history displayed in upper-right corner during gameplay
  - Cumulative score tracked on dashboard

## Common Patterns

- Use React hooks (`useState`, `useEffect`, `useCallback`, `useMemo`)
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use context API for global state (game state, user progress)

## Future Considerations

- May need backend API for location data
- May integrate with Google Street View API or similar
- May add user authentication and leaderboards
- May need to handle image loading and caching

## Anti-patterns to Avoid

- Don't hardcode NUS location coordinates (use data files)
- Don't create overly large components (split into smaller ones)
- Don't mix game logic with UI rendering (separate concerns)
