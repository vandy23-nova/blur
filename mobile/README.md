# Blur - React Native Mobile App

The official mobile app for Blur, built with React Native and Expo.

## Tech Stack

- **Framework:** React Native with Expo SDK 50
- **Navigation:** Expo Router (file-based routing)
- **State Management:** Zustand
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Backend:** Supabase (Auth, Database, Storage)
- **Push Notifications:** Expo Notifications

## Prerequisites

- Node.js 18+ and npm/yarn
- iOS Simulator (Mac only) or Android Studio
- Expo Go app on your phone (for testing)

## Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create a `.env` file in the root:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **Start the development server:**

```bash
npm start
```

This will open Expo Dev Tools. You can then:
- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Scan the QR code with Expo Go app on your phone

## Project Structure

```
mobile/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Authentication screens
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)/            # Main tab screens
│   │   ├── index.tsx      # Feed (home)
│   │   ├── send.tsx       # Send blur
│   │   ├── polls.tsx      # Polls
│   │   └── profile.tsx    # Profile
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── lib/                   # Core utilities
│   ├── supabase.ts       # Supabase client
│   └── types.ts          # TypeScript types
├── stores/               # Zustand state stores
│   ├── useAuthStore.ts
│   └── useBlursStore.ts
└── assets/               # Images, fonts, etc.
```

## Features Implemented

✅ **Authentication**
- Email signup/login with Supabase Auth
- Persistent sessions with AsyncStorage
- Protected routes

✅ **Blur Feed**
- View received blurs
- Progressive blur reveal
- Unlock with coins or invites

✅ **Send Blurs**
- Camera capture
- Photo gallery picker
- Friend selection
- Message attachment

✅ **Profile**
- User stats (blurs sent/received, streak)
- Coins balance
- Plus subscription badge

🚧 **Coming Soon**
- Polls feature
- Leaderboard rankings
- Push notifications
- Contact sync
- In-app purchases

## Building for Production

### iOS

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure build
eas build:configure

# Build for iOS
eas build --platform ios
```

### Android

```bash
# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Google Play
eas build --platform android --profile production
```

## Push Notifications Setup

1. Register for push notifications token:

```typescript
import * as Notifications from 'expo-notifications';

const token = await Notifications.getExpoPushTokenAsync();
```

2. Save token to Supabase `push_tokens` table

3. Send notifications via Expo Push API

## Testing

Run TypeScript type checking:

```bash
npm run type-check
```

Run linter:

```bash
npm run lint
```

## Common Issues

### "Cannot find module 'react-native-url-polyfill'"

Install the missing dependency:

```bash
npm install react-native-url-polyfill
```

### Images not loading from Supabase Storage

Make sure you've configured storage policies in Supabase. See `../supabase/migrations/001_initial_schema.sql` for RLS policies.

### Expo Go app shows "Something went wrong"

Clear cache and restart:

```bash
npm start --clear
```

## Environment Variables

Required variables in `.env`:

- `EXPO_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Docs](https://expo.github.io/router/docs/)
- [NativeWind Docs](https://www.nativewind.dev/)
- [Supabase React Native Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
