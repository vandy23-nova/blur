# Stripe Setup Guide - Blur App

## Overview

Blur uses Stripe for:
1. **Credit purchases** - Users buy credits with card
2. **Payouts** - Creators withdraw earnings (Stripe Connect)
3. **Revenue sharing** - 95% creator, 5% platform

---

## Step 1: Create Stripe Account

1. Go to https://dashboard.stripe.com/register
2. Sign up with business email
3. Verify email
4. Complete business profile (Individual or Company)

---

## Step 2: Get API Keys

### Test Mode (for development)
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### Live Mode (for production)
1. Complete Stripe account verification
2. Go to https://dashboard.stripe.com/apikeys
3. Copy:
   - **Publishable key** (starts with `pk_live_`)
   - **Secret key** (starts with `sk_live_`)

---

## Step 3: Enable Stripe Connect (for payouts)

1. Go to https://dashboard.stripe.com/connect/accounts/overview
2. Click "Get Started"
3. Choose **Standard** accounts (creators manage their own Stripe)
4. Set platform name: "Blur"
5. Set brand color: #8B5CF6 (purple)

### Connect Settings
- **OAuth settings:** Enable
- **Redirect URI:** Add your domains:
  - Test: `http://localhost:3000/api/stripe/connect/callback`
  - Live: `https://blur.app/api/stripe/connect/callback`

---

## Step 4: Configure Webhooks

### Create Webhook Endpoint

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Set endpoint URL:
   - Test: `https://your-vercel-url.vercel.app/api/stripe/webhook`
   - Live: `https://blur.app/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed` - Credit purchase succeeded
   - `payment_intent.succeeded` - Payment confirmed
   - `payment_intent.payment_failed` - Payment failed
   - `account.updated` - Connect account changes
   - `payout.paid` - Creator payout completed
   - `payout.failed` - Payout failed

5. Copy **Webhook signing secret** (starts with `whsec_`)

---

## Step 5: Add Environment Variables

### Local Development (.env.local)
```env
# Stripe Keys (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Stripe Connect
STRIPE_CONNECT_CLIENT_ID=ca_xxxxxxxxxxxxx
```

### Vercel Production
```bash
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
# Enter: pk_live_xxxxxxxxxxxxx

vercel env add STRIPE_SECRET_KEY production  
# Enter: sk_live_xxxxxxxxxxxxx

vercel env add STRIPE_WEBHOOK_SECRET production
# Enter: whsec_xxxxxxxxxxxxx

vercel env add STRIPE_CONNECT_CLIENT_ID production
# Enter: ca_xxxxxxxxxxxxx
```

---

## Step 6: Test Payment Flow

### Test Credit Cards (Test Mode Only)
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **3D Secure:** 4000 0027 6000 3184

### Test Flow
1. Go to `/credits` page
2. Click "Buy 10 Credits ($0.99)"
3. Enter test card: 4242 4242 4242 4242
4. Expiry: Any future date (e.g., 12/34)
5. CVC: Any 3 digits (e.g., 123)
6. Complete purchase
7. Verify credits added in database

---

## Step 7: Enable Connect Payouts

### Creator Onboarding Flow
```
1. Creator clicks "Connect Stripe" in earnings page
2. Redirect to Stripe Connect OAuth
3. Creator completes Stripe onboarding
4. Stripe redirects back with account ID
5. Store `stripe_account_id` in users table
6. Creator can now request payouts
```

### Test Connect Account
Use Stripe CLI to create test Connect account:
```bash
stripe accounts create \
  --type=standard \
  --country=US \
  --email=test@creator.com
```

---

## Step 8: Pricing Configuration

### Credit Value
- **1 credit = $0.10 USD** (10 cents)
- Unlock costs:
  - Easy blur: 3 credits ($0.30)
  - Medium blur: 5 credits ($0.50)
  - Hard blur: 10 credits ($1.00)

### Revenue Split
- **Creator:** 95% of unlock price
- **Platform:** 5% platform fee

Example:
- User unlocks medium blur (5 credits = $0.50)
- Creator earns: $0.475 (95%)
- Platform earns: $0.025 (5%)

### Payout Minimum
- **Minimum balance:** $10.00
- **Payout fee:** Free (Stripe standard rates apply)
- **Payout timing:** Instant (with Instant Payouts) or 2-7 days (standard)

---

## Step 9: Go Live Checklist

Before switching to live mode:

- [ ] Complete Stripe account verification
- [ ] Update API keys to live mode
- [ ] Test webhook endpoint in live mode
- [ ] Enable Connect for creators
- [ ] Set up tax collection (if required)
- [ ] Review Stripe fees (2.9% + $0.30 per transaction)
- [ ] Test payout flow with real bank account
- [ ] Set up fraud prevention (Stripe Radar)
- [ ] Configure email receipts
- [ ] Add refund policy to Terms of Service

---

## Stripe Fees

### Standard Transactions (Credit Purchases)
- **Domestic cards:** 2.9% + $0.30
- **International cards:** 3.9% + $0.30
- **Example:** $0.99 purchase = $0.059 fee (6%)

### Connect Transfers (Creator Payouts)
- **Standard payout:** Free (0%)
- **Instant payout:** 1% (min $0.50)
- **International transfer:** 1% (min $1.00)

### Total Platform Cost
On a $0.99 credit purchase:
- Stripe fee: ~$0.059
- Platform share (5%): $0.05
- **Net platform revenue:** $0.05 - $0.059 = -$0.009 (loss on small transactions)

**Strategy:** Encourage larger credit packages to reduce per-transaction costs.

---

## Monitoring & Analytics

### Stripe Dashboard
- Monitor revenue: https://dashboard.stripe.com/payments
- Track payouts: https://dashboard.stripe.com/payouts
- View Connect accounts: https://dashboard.stripe.com/connect/accounts

### Webhooks Health
- Check deliveries: https://dashboard.stripe.com/webhooks
- Retry failed webhooks manually
- Set up alerts for webhook failures

### Fraud Detection
- Enable Stripe Radar: https://dashboard.stripe.com/radar
- Review disputed charges
- Block suspicious cards

---

## Troubleshooting

### "No such payment_intent" error
- Check webhook secret matches
- Verify webhook is receiving events
- Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### Credits not added after payment
- Check `credit_transactions` table
- Verify webhook processed successfully
- Check Stripe logs for errors

### Payout failed
- Verify creator completed Connect onboarding
- Check `stripe_account_id` is stored correctly
- Review Stripe Connect dashboard for errors

---

## Support

- **Stripe Docs:** https://stripe.com/docs
- **Stripe Connect Guide:** https://stripe.com/docs/connect
- **Webhook Testing:** https://stripe.com/docs/webhooks/test
- **Support:** https://support.stripe.com

---

**Status:** ✅ Monetization infrastructure ready for Stripe integration
