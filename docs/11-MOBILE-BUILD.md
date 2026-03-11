# Mobile App Build Guide - Blur

## Overview

Blur mobile app is built with:
- **React Native** (Expo SDK 50)
- **Expo Router** for navigation
- **EAS Build** for Android APK + iOS IPA

**Estimated time:** 20-30 minutes (mostly automated cloud build)

---

## Prerequisites

1. **Expo account** (free): https://expo.dev/signup
2. **EAS CLI installed:**
   ```bash
   npm install -g eas-cli
   ```

3. **For iOS builds:** Apple Developer account ($99/year)

---

## Step 1: Login to Expo

```bash
eas login
# Enter your Expo credentials
```

Or use token:
```bash
export EXPO_TOKEN=your-expo-token
```

---

## Step 2: Initialize EAS Project

```bash
cd projects/blur/mobile
eas build:configure
```

This will:
- Create/update `eas.json`
- Generate EAS project ID
- Update `app.json` with project ID

---

## Step 3: Update Environment Variables

Ensure `.env` file exists with Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://ugyhuvxikcgwasqccinj.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

These are already set in `projects/blur/mobile/.env`.

---

## Step 4: Build Android APK

```bash
eas build --platform android --profile production
```

**What happens:**
1. Code uploaded to EAS cloud
2. Android app built remotely (~10-15 min)
3. APK generated and ready for download

**Output:**
```
✔ Build finished
APK: https://expo.dev/artifacts/eas/[build-id].apk
```

---

## Step 5: Build iOS IPA (Optional)

**Requirements:**
- Apple Developer account ($99/year)
- Developer certificate
- Provisioning profile

```bash
eas build --platform ios --profile production
```

**First-time iOS setup:**
```bash
eas credentials
# Follow prompts to configure Apple certificates
```

---

## Step 6: Download & Distribute

### Android (APK)
1. Download APK from EAS dashboard or link
2. Share with testers via:
   - Direct download link
   - Google Drive / Dropbox
   - Internal distribution platform

### iOS (IPA)
1. Download IPA from EAS
2. Distribute via:
   - TestFlight (requires App Store Connect)
   - Internal distribution (enterprise accounts)
   - Ad-hoc (limited devices)

---

## Alternative: Local Development Build

For testing without cloud build:

```bash
# Start Metro bundler
npx expo start

# Scan QR code with Expo Go app on your phone
# Works for Android & iOS (no build needed)
```

**Note:** Expo Go has limitations (no custom native code). For full features, use EAS Build.

---

## EAS Build Configuration

### Current `eas.json`:

```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "buildConfiguration": "Release"
      }
    }
  }
}
```

### App Configuration (`app.json`):

- **Android package:** `com.blur.app`
- **iOS bundle:** `com.blur.app`
- **Version:** 1.0.0

---

## Publishing to App Stores

### Google Play Store (Android)

1. Create Google Play Developer account ($25 one-time)
2. Build production APK or AAB:
   ```bash
   eas build --platform android --profile production
   ```
3. Upload to Play Console
4. Fill store listing (screenshots, description)
5. Submit for review (~1-3 days)

### Apple App Store (iOS)

1. Apple Developer account required ($99/year)
2. Create App ID in Apple Developer portal
3. Build IPA:
   ```bash
   eas build --platform ios --profile production
   ```
4. Upload to App Store Connect via EAS Submit:
   ```bash
   eas submit --platform ios
   ```
5. Fill store listing
6. Submit for review (~1-5 days)

---

## Troubleshooting

### "No valid credentials found"
Run `eas credentials` and follow setup wizard.

### "Build failed: Gradle error"
Check `android/build.gradle` for version conflicts.

### "iOS code signing failed"
Ensure Apple certificates are valid:
```bash
eas credentials --platform ios
```

### "App crashes on launch"
Check environment variables are set correctly in `.env`.

---

## Build Status & Monitoring

### Check build status:
```bash
eas build:list
```

### View build logs:
```bash
eas build:view [build-id]
```

### Cancel running build:
```bash
eas build:cancel [build-id]
```

---

## Automated Builds (CI/CD)

### GitHub Actions Example:

```yaml
name: EAS Build
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: eas build --platform all --non-interactive
```

---

## Cost Breakdown

### Free Tier (Expo)
- **Builds:** Unlimited
- **Build time:** Standard queue (~10-15 min wait)
- **Storage:** 7 days artifact retention

### Paid Plans
- **Priority:** $29/mo - faster queue, 30-day retention
- **Production:** $99/mo - dedicated workers, 90-day retention

### App Store Fees
- **Google Play:** $25 one-time
- **Apple App Store:** $99/year

---

## Current Mobile App Status

**Location:** `projects/blur/mobile/`

**Status:**
- ✅ Code ready (React Native + Expo)
- ✅ EAS config created (`eas.json`)
- ✅ Environment variables set
- ✅ Dependencies installed
- ⏳ Build pending (run `eas build`)

**Features:**
- Authentication (Supabase Auth)
- Blur feed
- Send blur
- Unlock mechanics
- Profile & stats
- Push notifications setup

---

## Quick Start (TL;DR)

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login
eas login

# 3. Go to mobile directory
cd projects/blur/mobile

# 4. Initialize project (first time)
eas build:configure

# 5. Build Android
eas build --platform android --profile production

# 6. Wait 10-15 minutes

# 7. Download APK from link provided
```

---

## Support

- **Expo Docs:** https://docs.expo.dev/build/introduction/
- **EAS Build:** https://docs.expo.dev/build/setup/
- **Troubleshooting:** https://docs.expo.dev/build-reference/troubleshooting/

---

**Status:** Mobile app code complete, ready for EAS build. Run commands above to generate APK/IPA.
