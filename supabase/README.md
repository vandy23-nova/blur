# Blur - Supabase Backend

This directory contains the Supabase database schema and configuration for the Blur app.

## Setup

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Initialize Supabase Project

If you need to create a new project:

```bash
# Login to Supabase
supabase login

# Link to existing project
supabase link --project-ref your-project-ref

# Or initialize a new local project
supabase init
```

### 3. Run Migrations

Apply the database schema:

```bash
# Run all migrations
supabase db push

# Or if running locally
supabase start
supabase db reset
```

### 4. Get Environment Variables

```bash
supabase status
```

This will output:
- `API URL` - Your Supabase API endpoint
- `anon key` - Public anonymous key for client apps
- `service_role key` - Admin key (keep secret!)

Add these to your `.env` files in mobile and web apps.

## Database Schema

### Tables

- **users** - User profiles (extends Supabase auth.users)
- **schools** - High schools and universities
- **blurs** - Photo blurs sent between users
- **polls** - Anonymous polls for schools
- **poll_votes** - Votes on polls
- **notifications** - Push notifications queue
- **friendships** - Friend connections
- **leaderboard** - User stats and rankings
- **transactions** - Payment history
- **push_tokens** - Expo push notification tokens

### Storage Buckets

- **blurs** - Image storage for blur photos (private)

### Security

All tables have Row Level Security (RLS) enabled. Users can only:
- View their own data
- View data from users in their school (where applicable)
- Create blurs and votes
- Update their own records

## Local Development

Start local Supabase stack:

```bash
supabase start
```

This runs:
- PostgreSQL database on `localhost:54322`
- PostgREST API on `localhost:54321`
- Supabase Studio on `http://localhost:54323`
- Storage API
- Auth API

Stop local stack:

```bash
supabase stop
```

## Production Deployment

```bash
# Push migrations to production
supabase db push --linked

# Or create a migration file
supabase migration new your_migration_name
```

## Environment Variables

Required for mobile/web apps:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Testing

You can test the schema locally:

```bash
# Reset database and apply migrations
supabase db reset

# Run SQL queries
supabase db query "SELECT * FROM users LIMIT 10;"
```

## Useful Commands

```bash
# Generate TypeScript types from schema
supabase gen types typescript --local > ../shared/types/database.ts

# View logs
supabase logs

# Manage secrets
supabase secrets set KEY=value
```
