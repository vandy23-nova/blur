# Blur - Viral Social Photo App

Blur is a viral social app inspired by Gas and tbh, where users send "blurred" photos to friends who must unlock them by guessing the sender or inviting friends.

## 🚀 Features

- **Anonymous Photo Sharing:** Send blurred photos to friends
- **Unlock Mechanism:** Guess sender or invite friends to reveal
- **Gamification:** Coins, streaks, and leaderboards
- **Polls:** Vote on fun questions about friends
- **Push Notifications:** Real-time alerts for new blurs
- **Freemium Model:** Free tier with optional Plus subscription

## 📁 Project Structure

```
blur/
├── mobile/             # React Native app (Expo)
├── web/                # Next.js web app
├── supabase/           # Database schema and migrations
└── docs/               # Documentation
    ├── 01-SPEC.md      # Product specification
    └── 02-ARCHITECTURE.md  # Technical architecture
```

## 🛠 Tech Stack

### Mobile App
- React Native (Expo SDK 50)
- TypeScript
- Expo Router (file-based routing)
- NativeWind (Tailwind for RN)
- Zustand (state management)

### Web App
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Zustand (state management)

### Backend
- Supabase (PostgreSQL + Auth + Storage + Realtime)
- Row Level Security (RLS) policies
- Automatic triggers for notifications

## 🚀 Quick Start

### 1. Set up Supabase

```bash
cd supabase
npm install -g supabase

# Start local Supabase (or link to remote project)
supabase start

# Apply migrations
supabase db reset
```

See [`supabase/README.md`](./supabase/README.md) for details.

### 2. Run Mobile App

```bash
cd mobile
npm install

# Create .env file
cp .env.example .env
# Add your Supabase credentials

# Start development server
npm start
```

See [`mobile/README.md`](./mobile/README.md) for details.

### 3. Run Web App

```bash
cd web
npm install

# Create .env.local file
cp .env.example .env.local
# Add your Supabase credentials

# Start development server
npm run dev
```

See [`web/README.md`](./web/README.md) for details.

## 📊 Database Schema

### Main Tables

- **users** - User profiles (username, coins, Plus subscription)
- **schools** - High schools and universities
- **blurs** - Photo blurs sent between users
- **polls** - Anonymous polls for schools
- **notifications** - Push notification queue
- **friendships** - Friend connections
- **leaderboard** - User stats and rankings
- **transactions** - Payment history

See [`supabase/migrations/001_initial_schema.sql`](./supabase/migrations/001_initial_schema.sql) for full schema.

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Users can only view their own data and school members' data
- Anonymous interactions protected until unlock
- Secure image storage with signed URLs
- Server-side session validation

## 💰 Monetization

### Free Tier
- Send 10 blurs/day
- Receive unlimited blurs
- Earn coins through activity
- Ads between actions

### Blur Plus ($2.99/month)
- Unlimited blurs
- No ads
- See who viewed your profile
- Priority in leaderboard
- Exclusive filters

### In-App Purchases
- 100 coins: $0.99
- 500 coins: $3.99
- 1000 coins: $6.99

## 📈 Revenue Projections

- **10,000 users:** ~$5,000/mo
- **100,000 users:** ~$50,000/mo

## 🚢 Deployment

### Mobile

```bash
cd mobile

# iOS
eas build --platform ios

# Android
eas build --platform android
```

### Web

```bash
cd web

# Deploy to Vercel
vercel --prod
```

## 📱 Platform Support

- **iOS:** 13.0+
- **Android:** 5.0+ (API 21)
- **Web:** Modern browsers (Chrome, Safari, Firefox)

## 🧪 Testing

### Mobile
```bash
cd mobile
npm run type-check
npm run lint
```

### Web
```bash
cd web
npm run type-check
npm run lint
npm run build
```

## 📄 Documentation

- [Product Specification](./docs/01-SPEC.md) - Features, user stories, monetization
- [Technical Architecture](./docs/02-ARCHITECTURE.md) - Database schema, API endpoints, infrastructure

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📝 License

Proprietary - All rights reserved

## 🔗 Links

- **Figma Design:** (TODO)
- **Supabase Dashboard:** https://app.supabase.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **EAS Dashboard:** https://expo.dev/accounts/[your-account]/projects

## 📞 Support

For questions or issues, contact [your-email@example.com](mailto:your-email@example.com)

---

Built with ❤️ by the Blur team
