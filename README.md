# React Native Video Learning App

A modern, feature-rich YouTube-based learning application built with React Native and Expo. Discover, search, and watch technology-related educational videos with a beautiful, intuitive interface.

## Overview

This application provides a seamless video learning experience focused on modern web development technologies. Users can browse curated content across categories like React Native, React, TypeScript, and JavaScript, with powerful search and sorting capabilities powered by the YouTube Data API v3.

### Key Features

- **Guest Authentication** - Quick access with a simple guest login
- **Categorized Home Feed** - Organized video sections for React Native, React, TypeScript, and JavaScript
- **Advanced Search** - Real-time search with debouncing (500ms) for smooth performance
- **Smart Sorting** - Sort videos by:
  - Upload date (latest/oldest)
  - View count (most popular)
  - Relevance
- **Full-Featured Video Player**:
  - Play/pause controls
  - Seek forward/backward (5 seconds)
  - Mute video support
  - Fullscreen support
  - Progress bar with time display (MM:SS)
  - Auto-hiding controls (3 seconds of inactivity)
  - Adjustable playback opacity
- **Detailed Video Information**:
  - Title and channel name
  - Full video description
  - View count and like statistics
  - Tabbed interface for additional content
- **Infinite Scroll** - Seamless pagination for endless browsing
- **Skeleton Loaders** - Polished loading states for better UX
- **Custom Icon System** - 18+ SVG-based custom icons

## Tech Stack

### Core Technologies

- **React Native** `0.81.5` - Cross-platform mobile development
- **React** `19.1.0` - UI framework with React Compiler enabled
- **Expo** `~54.0.23` - Development platform and tooling
- **TypeScript** `~5.9.2` - Type-safe development
- **Expo Router** `~6.0.14` - File-based routing

### State & Data Management

- **TanStack React Query** `^5.90.7` - Server state management with intelligent caching
- **React Navigation** `^7.1.8` - Navigation infrastructure

### UI & Animation

- **React Native Reanimated** `~4.1.1` - High-performance animations
- **React Native Gesture Handler** `~2.28.0` - Gesture recognition
- **React Native Video** `^6.17.0` - Advanced video playback
- **Expo Image** `~3.0.10` - Optimized image loading
- **React Native SVG** `15.12.1` - SVG rendering

### Development Tools

- **Biome** `2.1.1` - Fast code formatter and linter
- **ESLint** `^9.25.0` - Code quality enforcement
- **SVGR** `^8.1.0` - SVG to React component generation

### Design System

- **Poppins** - Custom font family for typography
- **Custom color palette** - Consistent theme with `hexa()` utility for alpha channel manipulation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun package manager
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator
- YouTube Data API v3 key (for API access)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd video-app
```

2. Install dependencies:

```bash
bun install
# or
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```env
EXPO_PUBLIC_API_KEY=your_youtube_api_key_here
EXPO_PUBLIC_API_URL=https://www.googleapis.com/youtube/v3
```

**How to get a YouTube API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**
4. Navigate to **Credentials** and create an API key
5. (Optional) Restrict the key to YouTube Data API v3 and specific platforms for security
6. Copy the API key to your `.env` file

### Running the App

Start the development server:

```bash
bunx expo start
```

Or use specific commands:

```bash
# Start with cache cleared
bunx expo start --clear

# Run on iOS simulator
bunx expo start --ios

# Run on Android emulator
bunx expo start --android

# Run on physical device (Expo Go)
bunx expo start --tunnel
```

In the terminal output, you'll find options to:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your physical device

## Project Structure

```
video-app/
├── api/
│   └── youtube.ts              # YouTube API integration
├── app/                        # Expo Router screens
│   ├── _layout.tsx            # Root layout
│   ├── index.tsx              # Guest login screen
│   ├── (tabs)/                # Tab navigation
│   │   ├── _layout.tsx
│   │   ├── index.tsx          # Home feed
│   │   └── search.tsx         # Search screen
│   └── video/
│       └── [id].tsx           # Video player (dynamic route)
├── components/
│   ├── icons/                 # Auto-generated SVG icons
│   ├── skeletons/             # Loading skeletons
│   ├── ui/                    # Reusable UI components
│   │   ├── button.tsx
│   │   ├── empty-state.tsx
│   │   ├── input.tsx
│   │   ├── radio.tsx
│   │   ├── radio-group.tsx
│   │   ├── sorting-modal.tsx
│   │   ├── tabs.tsx
│   │   └── typography.tsx
│   └── video/                 # Video-specific components
│       ├── control-button.tsx
│       ├── controls.tsx       # Player controls
│       ├── progress.tsx       # Progress bar
│       ├── video-card.tsx
│       ├── video-details.tsx
│       └── videos-section.tsx
├── hooks/                     # Custom React hooks
│   ├── use-debounce.ts
│   ├── use-search-videos.ts   # Search query hook
│   └── use-video-details.ts   # Video details hook
├── types/
│   └── videos.ts              # TypeScript definitions
├── utils/
│   ├── colors.ts              # Color palette & hexa()
│   └── fonts.ts               # Font imports
├── assets/                    # Images, icons, videos
├── .env                       # Environment variables
├── app.json                   # Expo configuration
├── tsconfig.json              # TypeScript config
├── biome.json                 # Code formatting config
└── package.json               # Dependencies
```

## Environment Variables

This project uses environment variables prefixed with `EXPO_PUBLIC_` to make them accessible in the client app.

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `EXPO_PUBLIC_API_KEY` | YouTube Data API v3 key | Yes | `AIzaSyA...` |
| `EXPO_PUBLIC_API_URL` | YouTube API base URL | Yes | `https://www.googleapis.com/youtube/v3` |

**Note:** Since these are public environment variables (client-side), ensure your API key is properly restricted in Google Cloud Console to prevent abuse.

## Features in Detail

### Home Screen

The home screen displays videos organized by technology categories:
- **React Native** - Mobile development tutorials
- **React** - React.js ecosystem content
- **TypeScript** - Type-safe JavaScript videos
- **JavaScript** - Core JS fundamentals

Each section loads 10 videos from YouTube filtered by the Science & Technology category (ID: 28).

### Search Screen

- **Real-time Search** - Debounced input prevents excessive API calls
- **Sort Options** - Modal interface for sorting preferences
- **Infinite Scroll** - Load more videos automatically
- **Empty States** - User-friendly messages when no results found

### Video Player

A fully custom video player with:
- **Gesture Controls** - Tap to show/hide controls
- **Time Controls** - Skip forward/backward 5 seconds
- **Progress Tracking** - Visual progress bar with time indicators
- **Volume Management** - Mute/unmute functionality
- **Fullscreen Mode** - Immersive viewing experience
- **Auto-hide Controls** - Controls fade after 3 seconds

### Video Details

Below the player, users can view:
- **Metadata** - Title, channel, upload date
- **Statistics** - View count and likes
- **Description** - Full video description
- **Tabbed Layout** - Extensible for notes and comments

## API Integration

### YouTube Data API v3

The app uses two main endpoints:

1. **Search Endpoint** (`/search`)
   - Search videos by query
   - Filter by category (Science & Technology)
   - Sort by date, viewCount, or relevance
   - Pagination support

2. **Videos Endpoint** (`/videos`)
   - Fetch detailed video information
   - Get statistics (views, likes)
   - Retrieve full descriptions

### Caching Strategy

React Query provides intelligent caching:
- **Stale Time:** 1 hour (3600000ms)
- **Automatic Refetching** - When data becomes stale
- **Background Updates** - Keeps data fresh without blocking UI

## Development

### Code Quality

```bash
# Run linter
bun run lint

# Format code
bunx biome format --write .

# Type check
bunx tsc --noEmit
```

### Icon Generation

Custom icons are generated from SVG files:

```bash
# Convert SVGs to React components
bun run generate-icons
```

Place SVG files in `assets/icons/` and run the script to auto-generate components in `components/icons/`.

## Building for Production

### iOS

```bash
# Create production build
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### Android

```bash
# Create production build
eas build --platform android

# Submit to Google Play
eas submit --platform android
```

**Note:** You'll need an [Expo Application Services (EAS)](https://expo.dev/eas) account for production builds.

## Configuration

### App Metadata

Key settings in `app.json`:
- **Version:** 1.0.0
- **Orientation:** Portrait (locked)
- **Platforms:** iOS, Android
- **New Architecture:** Enabled for performance
- **React Compiler:** Enabled for optimizations

### TypeScript

Path aliases are configured for cleaner imports:

```typescript
import { Button } from '@/components/ui/button'
// Instead of: ../../components/ui/button
```

## Performance

- **React 19** with React Compiler for automatic optimizations
- **Reanimated** for 60fps animations
- **React Query** for efficient data fetching and caching
- **Debouncing** on search to reduce API calls
- **Skeleton loaders** for perceived performance
- **Native New Architecture** for improved rendering

## Contributing

### Commit Convention

This project follows conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks
- `docs:` - Documentation updates

## Troubleshooting

### Common Issues

**API Key Not Working:**
- Verify the key is correct in `.env`
- Check if YouTube Data API v3 is enabled in Google Cloud Console
- Ensure API key restrictions allow your app's bundle ID

**Videos Not Loading:**
- Check your internet connection
- Verify API quota hasn't been exceeded (10,000 units/day free tier)
- Check console logs for error messages

**App Won't Start:**
- Clear cache: `npx expo start --clear`
- Delete node_modules and reinstall: `rm -rf node_modules && bun install`
- Check Node.js version (v18+ required)

---

Built with ❤️ using React Native and Expo
