# Blur - Next.js Web App

The official web application for Blur, built with Next.js 14 and the App Router.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Backend:** Supabase (Auth, Database, Storage)
- **State Management:** Zustand
- **Deployment:** Vercel

## Prerequisites

- Node.js 18+ and npm/yarn
- Supabase project (see `../supabase/README.md`)

## Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

3. **Run development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── dashboard/         # Main app dashboard
│   │   ├── api/               # API routes
│   │   │   └── blurs/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/            # React components
│   │   ├── BlurFeed.tsx
│   │   └── DashboardNav.tsx
│   ├── lib/                   # Utilities
│   │   ├── supabase/
│   │   │   ├── client.ts      # Browser client
│   │   │   └── server.ts      # Server client
│   │   ├── types.ts
│   │   └── utils.ts
│   └── stores/               # Zustand stores
└── public/                   # Static assets
```

## Features Implemented

✅ **Authentication**
- Email signup/login with Supabase Auth
- Server-side session handling
- Protected routes

✅ **Dashboard**
- View received blurs
- Unlock blurs
- User profile with coins

✅ **API Routes**
- GET /api/blurs - Fetch user's blurs
- POST /api/blurs - Send a new blur

🚧 **Coming Soon**
- Send blur UI
- Polls feature
- Leaderboard
- Profile settings
- Image upload to Supabase Storage

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Deployment to Vercel

1. **Install Vercel CLI:**

```bash
npm install -g vercel
```

2. **Deploy:**

```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

3. **Add environment variables in Vercel dashboard:**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

## API Routes

### GET /api/blurs
Fetch all blurs for the authenticated user.

**Response:**
```json
[
  {
    "id": "uuid",
    "sender_id": "uuid",
    "receiver_id": "uuid",
    "image_url": "https://...",
    "message": "Hey!",
    "unlocked": false,
    "blur_level": 100,
    "created_at": "2024-01-01T00:00:00Z",
    "sender": {
      "id": "uuid",
      "username": "john",
      "avatar_url": "https://..."
    }
  }
]
```

### POST /api/blurs
Send a blur to another user.

**Request:**
```json
{
  "receiver_id": "uuid",
  "image_url": "https://...",
  "message": "Optional message"
}
```

**Response:**
```json
{
  "id": "uuid",
  "sender_id": "uuid",
  "receiver_id": "uuid",
  "image_url": "https://...",
  "created_at": "2024-01-01T00:00:00Z"
}
```

## Supabase Integration

The app uses two Supabase clients:

1. **Browser Client** (`@/lib/supabase/client`)
   - For client-side operations
   - Used in Client Components

2. **Server Client** (`@/lib/supabase/server`)
   - For server-side operations
   - Used in Server Components and API routes
   - Handles cookie-based sessions

## TypeScript

Run type checking:

```bash
npm run type-check
```

## Linting

```bash
npm run lint
```

## Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

Optional:
- `SUPABASE_SERVICE_ROLE_KEY` - For admin operations (keep secret!)

## Common Issues

### "Module not found" errors

Clear Next.js cache:

```bash
rm -rf .next
npm run dev
```

### Supabase client errors

Make sure you've set up the environment variables correctly in `.env.local`.

### Image optimization errors

Add your Supabase domain to `next.config.mjs` under `images.remotePatterns`.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
