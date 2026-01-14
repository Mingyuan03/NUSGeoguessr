# NUSGeoguessr

A web-based geography guessing game inspired by Geoguessr, but focused exclusively on locations within the National University of Singapore (NUS) campus.

## 🎮 About

NUSGeoguessr challenges players to identify their location on the NUS campus using panoramic street view imagery. Players are dropped into a random location and must use visual clues to pinpoint their exact position on an interactive map.

## 🚀 Features

- **Interactive Map**: Explore NUS campus locations through immersive street view imagery
- **Location Guessing**: Test your knowledge of NUS landmarks and buildings
- **Score System**: Earn points based on how close your guess is to the actual location
- **Multiple Game Modes**: Various challenges and difficulty levels
- **Modern UI**: Built with React for a smooth, responsive user experience

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Styling**: CSS
- **Maps**: Google Maps API (@react-google-maps/api)

## 📋 Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager
- Google Maps API key (see setup instructions below)

## 🏃 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/NUSGeoguessr.git

# Navigate to the project directory
cd NUSGeoguessr

# Install dependencies
npm install
```

### Google Maps API Setup

**Important**: The map feature requires a Google Maps API key. Without it, you'll see a warning: "This page can't load Google Maps correctly."

#### Step-by-Step Setup:

1. **Get a Google Maps API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Sign in with your Google account
   - Click "Create Project" or select an existing project
   - Wait for project creation (may take a minute)

2. **Enable the Maps JavaScript API**:
   - In the project dashboard, go to "APIs & Services" > "Library"
   - Search for "Maps JavaScript API"
   - Click on it and press "Enable"

3. **Create an API Key**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key
   - (Optional but recommended) Click "Restrict Key" to limit usage:
     - Under "Application restrictions", select "HTTP referrers"
     - Add `localhost:3000/*` for development
     - Add your production domain for deployment

4. **Configure the API Key in Your Project**:
   - Create a `.env` file in the **root directory** (same level as `package.json`)
   - Add the following line (replace with your actual key):
     ```
     REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyYourActualKeyHere
     ```
   - **Important**: 
     - No spaces around the `=` sign
     - No quotes around the key
     - The file must be named exactly `.env` (starts with a dot)

5. **Restart the Development Server**:
   - Stop the current server (Ctrl+C)
   - Run `npm start` again
   - The map should now load correctly

**Troubleshooting**:
- If you still see the warning, check:
  - The `.env` file is in the root directory (not in `src/`)
  - The variable name is exactly `REACT_APP_GOOGLE_MAPS_API_KEY`
  - You restarted the dev server after creating/editing `.env`
  - The API key is valid and has "Maps JavaScript API" enabled
  - Check browser console for specific error messages

**Note**: The `.env` file is gitignored and won't be committed to version control (this is intentional for security).

### Development

```bash
# Start the development server
npm start
```

The application will be available at `http://localhost:3000` (or the port specified by your build tool).

**To stop the development server**: Press `Ctrl+C` in the terminal where `npm start` is running. This will stop the server and return you to the command prompt. Simply closing the browser tab will NOT stop the server.

### Building for Production

```bash
# Create a production build
npm run build
```

## 📁 Project Structure

```
NUSGeoguessr/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── assets/
│   │   └── dummy-location.svg    # Placeholder location images
│   ├── components/
│   │   ├── Dashboard.js           # Main dashboard with score and start button
│   │   ├── Game.js                # Main game component
│   │   ├── GameMap.js             # Google Maps integration
│   │   ├── Countdown.js           # 3-second countdown
│   │   ├── Timer.js               # 20-second game timer
│   │   └── ScoreHistory.js        # Upper-right “recent score gains” widget (last 5)
│   ├── App.js                      # Main app component
│   └── index.js                   # Entry point
├── package.json
└── README.md
```

## 🎮 How to Play

1. **Start the Game**: Click the "Start" button on the dashboard
2. **Countdown**: Wait for the 3-second countdown
3. **View Location**: An image of an NUS location is displayed
4. **Find Location**: Use the draggable Google Map (restricted to Kent Ridge campus) to find the location
5. **Click to Select**: Click on the map to place your guess (red arrow marker)
6. **Confirm (optional)**: Click "Confirm" to submit your guess
7. **Auto-submit at 0s**: If time reaches **0**, the round **ends automatically**. If you didn’t make a guess, you receive **0 points**.
8. **Results**: After confirming or time running out, you will see:
   - Your score for the round
   - Your guess marker (if any)
   - The actual location marker
9. **Score Display**: During gameplay, recent score gains are shown in the **upper-right** (last 5 rounds)
10. **Repeat**: Return to dashboard with updated cumulative score

## 🔒 Security & Dependencies

### npm audit warnings

When running `npm audit`, you may see security warnings. Here's what to know:

**Current Status**: The warnings are in **development dependencies** (not production code), specifically in `react-scripts` and its transitive dependencies:
- `nth-check` (high severity) - Used by CSS processing tools
- `postcss` (moderate severity) - Used by CSS post-processing
- `webpack-dev-server` (moderate severity) - Development server only

**Risk Assessment**:
- **Low risk for production**: These vulnerabilities only affect the development environment
- **No user data at risk**: The issues don't expose user data or compromise the built application
- **Development-only exposure**: Only affects developers running `npm start` locally

**Recommended Actions**:
1. **For now**: No immediate action required. These are development dependencies and don't affect the production build
2. **Monitor**: Keep `react-scripts` updated when new versions are released
3. **Future consideration**: Consider migrating to Vite (faster, more modern) when ready for a major update
4. **Do NOT run**: `npm audit fix --force` - This will break your project by installing incompatible versions

**When to worry**: Only if you're running the dev server on a public network or if vulnerabilities are found in production dependencies.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by [Geoguessr](https://www.geoguessr.com/)
- Built for the NUS community

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.
