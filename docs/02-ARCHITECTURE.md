# Technical Architecture: Blur

## Tech Stack

### Frontend
- **Mobile:** React Native (Expo) + TypeScript
- **Web:** Next.js 14+ (App Router) cu responsive design
- **State Management:** Zustand (lightweight, perfect pentru React Native)
- **UI Components:** React Native Paper + custom components
- **Styling:** NativeWind (Tailwind for React Native)
- **Navigation:** Expo Router (file-based routing)

### Backend
- **API:** Next.js API Routes (serverless)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (email + OAuth social)
- **Storage:** Supabase Storage (pentru poze)
- **Real-time:** Supabase Realtime (pentru notifications)

### Infrastructure
- **Hosting Web:** Vercel
- **Mobile Deploy:** EAS Build (Expo Application Services)
- **Push Notifications:** Expo Push Notifications
- **Analytics:** Expo Analytics + Supabase Analytics
- **Image Processing:** Sharp (server-side blur) + React Native Blur (client-side)

### Third-Party Services
- **Payments:** RevenueCat (unified IAP pentru iOS + Android)
- **Ads:** Google AdMob
- **Contact Sync:** expo-contacts
- **Image Upload:** expo-image-picker
- **Push:** expo-notifications

---

## Database Schema

### Table: `users`
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | Supabase auth.users FK |
| username | varchar(30) | unique, not null | Display name |
| avatar_url | text | nullable | Profile photo |
| school_id | uuid | FK → schools | Pentru matchmaking local |
| phone | varchar(20) | unique, nullable | Pentru contact sync |
| coins | integer | default 100 | Virtual currency |
| is_plus | boolean | default false | Premium subscription |
| created_at | timestamp | default now() | |
| last_active | timestamp | default now() | Pentru cleanup |

**Indexes:**
- `idx_users_school` on `school_id`
- `idx_users_phone` on `phone`

### Table: `schools`
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| name | varchar(100) | not null | "Colegiul Național X" |
| city | varchar(50) | not null | Pentru location matching |
| type | enum | 'high_school', 'university' | |
| member_count | integer | default 0 | Cached count |

**Indexes:**
- `idx_schools_city` on `city`

### Table: `blurs`
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| sender_id | uuid | FK → users | Cine a trimis |
| receiver_id | uuid | FK → users | Cine primește |
| image_url | text | not null | Original photo în storage |
| message | text | nullable | Opțional mesaj |
| blur_level | integer | default 100 | 0-100, scade la reveal |
| unlocked | boolean | default false | A fost unblurred? |
| unlocked_at | timestamp | nullable | Când a fost revealed |
| difficulty | enum | 'easy', 'medium', 'hard' | Cost în coins/actions |
| created_at | timestamp | default now() | |

**Indexes:**
- `idx_blurs_receiver` on `receiver_id, unlocked`
- `idx_blurs_sender` on `sender_id`

### Table: `polls`
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| school_id | uuid | FK → schools | Limitat la școală |
| question | text | not null | "Cine e cel mai funny?" |
| created_at | timestamp | default now() | |
| expires_at | timestamp | not null | 24h default |

### Table: `poll_votes`
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| poll_id | uuid | FK → polls | |
| voter_id | uuid | FK → users | Cine votează (hidden) |
| voted_for_id | uuid | FK → users | Cine primește votul |
| created_at | timestamp | default now() | |

**Constraints:**
- Unique `(poll_id, voter_id)` - un user votează o singură dată per poll

### Table: `notifications`
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| user_id | uuid | FK → users | Destinatar |
| type | enum | 'blur_received', 'blur_unlocked', 'poll_mention', 'friend_joined' | |
| title | varchar(100) | not null | "Someone sent you a blur!" |
| body | text | nullable | Detalii |
| data | jsonb | nullable | Metadata (blur_id, etc.) |
| read | boolean | default false | |
| created_at | timestamp | default now() | |

**Indexes:**
- `idx_notifications_user` on `user_id, read, created_at DESC`

### Table: `friendships`
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| user_id | uuid | FK → users | |
| friend_id | uuid | FK → users | |
| status | enum | 'pending', 'accepted', 'blocked' | |
| created_at | timestamp | default now() | |

**Constraints:**
- Unique `(user_id, friend_id)`

### Table: `leaderboard`
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| user_id | uuid | PK, FK → users | |
| school_id | uuid | FK → schools | |
| blurs_sent | integer | default 0 | |
| blurs_received | integer | default 0 | |
| accuracy_rate | decimal(5,2) | default 0 | % ghicit corect |
| streak_days | integer | default 0 | Zile consecutive |
| rank | integer | nullable | Cached rank în școală |
| updated_at | timestamp | default now() | |

**Indexes:**
- `idx_leaderboard_school_rank` on `school_id, rank`

### Table: `transactions`
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| user_id | uuid | FK → users | |
| type | enum | 'coin_purchase', 'subscription', 'coin_spend' | |
| amount | integer | not null | Coins sau $ (in cents) |
| revenue_cents | integer | nullable | Revenue real |
| platform | enum | 'ios', 'android', 'web' | |
| receipt | text | nullable | RevenueCat receipt |
| created_at | timestamp | default now() | |

---

## API Endpoints

### Authentication
| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| POST | `/api/auth/signup` | Create account | Public |
| POST | `/api/auth/login` | Login | Public |
| POST | `/api/auth/logout` | Logout | Authenticated |
| GET | `/api/auth/me` | Get current user | Authenticated |

### Blurs
| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| GET | `/api/blurs` | Get blurs feed (received) | Authenticated |
| POST | `/api/blurs` | Send a blur | Authenticated |
| GET | `/api/blurs/:id` | Get specific blur | Authenticated |
| POST | `/api/blurs/:id/unlock` | Unlock blur (reveal) | Authenticated |
| POST | `/api/blurs/:id/guess` | Guess sender | Authenticated |

### Polls
| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| GET | `/api/polls` | Active polls în școală | Authenticated |
| POST | `/api/polls/:id/vote` | Vote în poll | Authenticated |
| GET | `/api/polls/:id/results` | Rezultate poll | Authenticated |

### Social
| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| GET | `/api/friends` | Lista prieteni | Authenticated |
| POST | `/api/friends/invite` | Invită prieten | Authenticated |
| POST | `/api/friends/:id/accept` | Accept friend request | Authenticated |
| GET | `/api/contacts/sync` | Sync phone contacts | Authenticated |

### Leaderboard
| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| GET | `/api/leaderboard` | Top users în școală | Authenticated |
| GET | `/api/leaderboard/me` | My stats | Authenticated |

### Payments
| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| POST | `/api/payments/coins` | Cumpără coins | Authenticated |
| POST | `/api/payments/subscribe` | Subscribe Blur Plus | Authenticated |
| POST | `/api/payments/webhook` | RevenueCat webhook | Public (verificat) |

### Notifications
| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| GET | `/api/notifications` | Get notifications | Authenticated |
| POST | `/api/notifications/:id/read` | Mark as read | Authenticated |
| POST | `/api/notifications/register-token` | Register push token | Authenticated |

---

## Folder Structure

```
blur/
├── apps/
│   ├── mobile/                    # React Native (Expo)
│   │   ├── app/                   # Expo Router pages
│   │   │   ├── (auth)/
│   │   │   │   ├── login.tsx
│   │   │   │   └── signup.tsx
│   │   │   ├── (tabs)/
│   │   │   │   ├── index.tsx      # Feed
│   │   │   │   ├── send.tsx       # Send blur
│   │   │   │   ├── polls.tsx      # Polls
│   │   │   │   └── profile.tsx    # Profile
│   │   │   └── _layout.tsx
│   │   ├── components/
│   │   │   ├── BlurCard.tsx
│   │   │   ├── UnblurModal.tsx
│   │   │   └── InviteSheet.tsx
│   │   ├── lib/
│   │   │   ├── supabase.ts
│   │   │   └── revenucat.ts
│   │   ├── stores/
│   │   │   └── useAuthStore.ts    # Zustand
│   │   ├── app.json
│   │   └── package.json
│   │
│   └── web/                       # Next.js
│       ├── src/
│       │   ├── app/
│       │   │   ├── (auth)/
│       │   │   ├── (app)/
│       │   │   └── api/           # API Routes
│       │   ├── components/
│       │   └── lib/
│       └── package.json
│
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── config.toml
│
├── docs/
│   ├── 00-IDEA.md
│   ├── 01-SPEC.md
│   └── 02-ARCHITECTURE.md
│
└── README.md
```

---

## External APIs & Services

### Supabase
- **Auth:** Social login (Google, Apple) + email
- **Database:** PostgreSQL with Row Level Security (RLS)
- **Storage:** Image uploads (blurred + original)
- **Realtime:** Subscripții pentru notifications

### RevenueCat
- **Purpose:** Unified IAP management (iOS + Android)
- **Features:** Subscription management, webhook events, analytics
- **Price:** Free până la $10k MRR

### Expo Push Notifications
- **Purpose:** Cross-platform push notifications
- **Free tier:** Unlimited notifications

### Google AdMob
- **Purpose:** Display ads pentru free users
- **Format:** Interstitial ads între actions (skippable)
- **Revenue:** ~$5 eCPM

### Sharp (server-side)
- **Purpose:** Image processing - blur images before storage
- **Blur algorithm:** Gaussian blur cu levels 0-100

---

## Security & Privacy

### Row Level Security (RLS) Policies
```sql
-- Users can only see their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);

-- Blurs: sender sees sent, receiver sees received
CREATE POLICY "View blurs" ON blurs FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);

-- Polls: only school members
CREATE POLICY "View polls" ON polls FOR SELECT USING (
  school_id IN (SELECT school_id FROM users WHERE id = auth.uid())
);
```

### Data Privacy
- **Phone numbers:** Hashed pentru contact matching, nu expuse
- **Anonymous interactions:** Sender ID hidden până la unlock
- **GDPR compliance:** Export & delete data on request
- **Age restriction:** 13+ (COPPA compliance)

### Content Moderation
- **Image scanning:** AWS Rekognition pentru inappropriate content
- **Report system:** Users pot reporta blurs (reviewed în 24h)
- **Auto-ban:** 3 reports = temporary ban

---

## Performance Optimizations

### Database
- **Indexes:** Pe toate FK și query-heavy columns
- **Materialized views:** Leaderboard ranking (refresh hourly)
- **Partitioning:** Notifications table partition by month
- **Cleanup:** Delete old notifications după 30 zile

### Images
- **Compression:** Sharp compress la max 500KB
- **CDN:** Supabase Storage are built-in CDN
- **Lazy loading:** Blurs load on-demand

### Caching
- **API responses:** Cache cu Vercel Edge
- **User data:** Cache în Zustand stores (mobile)
- **Leaderboard:** Cache 1h

### Real-time Updates
- **Supabase Realtime:** Subscribe doar la user's notifications
- **Debouncing:** Batch notifications (max 1/min)

---

## Deployment Strategy

### Phase 1: MVP (Week 1-2)
- Deploy web app pe Vercel
- Deploy API routes
- Supabase setup + migrations
- Basic mobile app (TestFlight + internal testing)

### Phase 2: Beta (Week 3)
- TestFlight pentru iOS
- Google Play Internal Testing pentru Android
- Beta testers (50 users dintr-o școală pilot)

### Phase 3: Public Launch (Week 4)
- App Store submission
- Google Play submission
- Public web app
- Marketing campaign

---

## Scalability Plan

### 0-10k users
- Supabase free tier: 500MB DB, 1GB storage
- Vercel free tier: 100GB bandwidth
- Current architecture handles easy

### 10k-100k users
- Supabase Pro: $25/mo
- Vercel Pro: $20/mo
- Add Redis cache (Upstash)

### 100k+ users
- Dedicated PostgreSQL (Supabase Enterprise)
- CDN pentru images (Cloudflare)
- Rate limiting (Upstash Redis)
- Horizontal scaling (Vercel auto-scales)

---

## Cost Breakdown (Monthly)

| Service | Free Tier | Paid (at scale) |
|---------|-----------|-----------------|
| Supabase | $0 (500MB) | $25-100 |
| Vercel | $0 (hobby) | $20-100 |
| Expo/EAS | $0 | $0 |
| RevenueCat | $0 (<$10k MRR) | 1% revenue |
| Push Notifications | $0 | $0 |
| Domain | $12/year | $12/year |
| **Total** | **~$1/mo** | **$50-250/mo** |

Revenue la 10k users: ~$5,000/mo
Profit margin: >95% după costs 🚀
