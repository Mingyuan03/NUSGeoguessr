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

1. **Get a Google Maps API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Maps JavaScript API"
   - Create credentials (API Key)
   - (Optional) Restrict the API key to your domain for security

2. **Configure the API Key**:
   - Create a `.env` file in the root directory
   - Add your API key:
     ```
     REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```
   - Restart the development server after adding the key

**Note**: The app will still run without an API key, but the map will not load. You'll see a loading message instead.

### Development

```bash
# Start the development server
npm start
```

The application will be available at `http://localhost:3000` (or the port specified by your build tool).

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
│   │   └── Timer.js               # 20-second game timer
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
6. **Confirm**: Click "Confirm" to submit your guess
7. **Score**: Points are awarded based on distance from the actual location (linear algorithm, max 5000 points)
8. **Repeat**: Return to dashboard with updated cumulative score

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
