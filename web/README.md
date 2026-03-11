# Blur - Premium Mystery Messaging App 🔮

A premium web app for sending mysterious, blurred photos that can be unlocked with credits or by inviting friends. Built with Next.js 14, Supabase, and Stripe.

## 🎨 Features

- **Liquid Glass Design** - Modern glassmorphism UI with premium aesthetics
- **Credit System** - Purchase credits via Stripe to unlock blurs
- **Earnings & Payouts** - Creators earn 95% from unlocks
- **Progressive Reveal** - Smooth blur-to-clear animation
- **Invite System** - Unlock blurs for free by inviting friends
- **Real-time Updates** - Powered by Supabase
- **Secure Payments** - Stripe Checkout integration
- **Responsive** - Mobile-first design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. **Clone and install dependencies**
   ```bash
   cd projects/blur/web
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your credentials:
   - Supabase URL and keys
   - Stripe secret key and webhook secret
   - App URL

3. **Run database migrations**
   
   Go to your Supabase project → SQL Editor and run:
   - `supabase/migrations/001_initial_schema.sql` (if not already done)
   - `supabase/migrations/002_monetization.sql`

4. **Set up Stripe webhook**
   
   ```bash
   # Install Stripe CLI
   brew install stripe/stripe-cli/stripe
   
   # Login
   stripe login
   
   # Forward webhooks to local dev
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   
   Copy the webhook secret (`whsec_...`) to your `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## 📦 Credit Packages

| Package | Credits | Price | Bonus |
|---------|---------|-------|-------|
| Starter | 10 | $0.99 | - |
| Popular | 50 | $3.99 | +5 |
| Value | 100 | $6.99 | +10 |
| Premium | 500 | $19.99 | +100 |

## 💰 Unlock Costs

- **Easy**: 3 credits
- **Medium**: 5 credits
- **Hard**: 10 credits

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/            # User dashboard
│   ├── credits/              # Buy credits
│   ├── earnings/             # View earnings
│   ├── onboarding/           # 3-step tutorial
│   ├── blur/[id]/            # Unlock page
│   └── api/
│       ├── stripe/
│       │   ├── checkout/     # Create checkout session
│       │   └── webhook/      # Handle Stripe events
│       ├── payouts/
│       │   └── request/      # Request payout
│       └── blurs/
│           └── unlock/       # Unlock blur with credits
├── components/
│   └── ui/
│       ├── GlassCard.tsx     # Glassmorphism card
│       └── GlassButton.tsx   # Premium button
└── lib/
    ├── supabase/             # Supabase clients
    └── utils.ts              # Utility functions
```

## 🎨 Design System

### Colors

- Purple: `#8B5CF6`
- Pink: `#EC4899`
- Cyan: `#06B6D4`
- Dark background: `from-slate-900 via-purple-900 to-slate-900`

### Components

- **GlassCard** - Backdrop blur, white/5 background, border
- **GlassButton** - Gradient or glass variants with hover effects
- **Animations** - shimmer, float, glow-pulse, fade-in, scale-in

## 🔐 Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=
```

## 📊 Database Schema

### New Tables (Monetization)

- **user_credits** - Current credit balance per user
- **credit_transactions** - All credit purchases and spends
- **earnings** - Revenue from unlocked blurs (95% to creator)
- **payouts** - Withdrawal requests and history

### Key Functions

- `process_credit_purchase()` - Add credits after Stripe payment
- `spend_credits_to_unlock()` - Spend credits and unlock blur
- `get_available_earnings()` - Get available payout balance

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Set up production webhook

```bash
# In Stripe Dashboard
Developers → Webhooks → Add endpoint
URL: https://your-domain.com/api/stripe/webhook
Events: checkout.session.completed, payment_intent.payment_failed
```

## 🧪 Testing

### Test Credit Purchase

1. Use Stripe test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC
4. Any billing ZIP

### Test Payout

1. Earn at least $10.00 in credits
2. Go to `/earnings`
3. Click "Request Payout"
4. Check `payouts` table in Supabase

## 📈 Revenue Model

- Users buy credits via Stripe
- Creators set difficulty (easy/medium/hard)
- When someone unlocks, creator earns 95%, platform gets 5%
- Minimum payout: $10.00
- Payouts processed within 3-5 business days

## 🎯 Roadmap

- [ ] Invite system (unlock for free by inviting 3 friends)
- [ ] Social sharing integration
- [ ] Analytics dashboard
- [ ] Subscription plans (unlimited unlocks)
- [ ] Mobile app (React Native)
- [ ] Referral bonuses
- [ ] Push notifications

## 🐛 Troubleshooting

**Stripe webhook not working:**
- Check webhook secret is correct
- Verify endpoint URL is correct
- Check Stripe CLI is running (in dev)

**Credits not added after payment:**
- Check Stripe webhook logs in dashboard
- Verify `process_credit_purchase()` function exists
- Check Supabase logs

**Can't request payout:**
- Minimum balance is $10.00
- Check `get_available_earnings()` function
- Verify user has unlocked blurs

## 📝 License

MIT

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Stripe](https://stripe.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
