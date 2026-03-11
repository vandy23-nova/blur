# Product Specification: Blur

## Core Features (MVP)

### 1. Onboarding în 30 secunde
- Nume + foto profil
- Sincronizare contacte (optional)
- Selectare școală/universitate pentru matchmaking local
- Tutorial interactiv (3 ecrane max)

### 2. Blur Feed - Photo Interactions
- Primești poze "blurate" de la prieteni/colegi
- Trebuie să ghicești cine a trimis sau să răspunzi la întrebări pentru unblur
- Progresive reveal: de la 100% blur la clear
- Swipe gestures: like, skip, save

### 3. Send Blurs
- Alegi un prieten din listă
- Upload/iei o poză
- Adaugi un mesaj sau întrebare (optional)
- Setezi difficulty (cât de greu e să unblur)

### 4. Anonymous Polls & Compliments
- "Care dintre prietenii tăi e cel mai funny?" - alegi din listă
- Primești notificare "Someone thinks you're funny!" dar nu vezi cine
- Unlock cu coins (earn prin activitate)

### 5. Viral Loop - Invite pentru Unlock
- Vezi "5 people sent you blurs" dar trebuie să inviți 2 prieteni să unlock
- Share link via WhatsApp, Instagram, Snapchat
- Bonus coins pentru fiecare prieten care se join

### 6. Notifications Push
- "🔔 Someone sent you a blur!"
- "👀 Someone unlocked your blur!"
- "🔥 You're in the top 10 in [school name]"

### 7. Profile & Stats
- Blurs sent/received
- Accuracy rate (ghicit corect)
- Streak (zile consecutive de activitate)
- Leaderboard în școală/universitate

## User Stories

**As a high school student:**
- I want to send funny photos to friends anonymously, so they have to guess who I am
- I want to see who thinks I'm cool/funny/smart, so I feel validated
- I want to unlock blurs from others, so I satisfy my curiosity

**As a college student:**
- I want to connect with classmates in a fun way, without the pressure of direct messaging
- I want to participate in polls about my friend group, so I can see how I'm perceived
- I want to compete on a leaderboard, so I can flex my social status

**As a first-time user:**
- I want to understand the app immediately, without reading instructions
- I want to have fun within 60 seconds of opening the app
- I want to invite friends easily, so we can all use it together

## Monetization

### Model: Freemium + In-App Purchases

**Free Tier:**
- Send 10 blurs/day
- Receive unlimited blurs
- Earn coins prin activitate (complete profile, invită prieteni, daily login)
- Ads între unblur actions (skippable după 3 sec)

**Blur Plus: $2.99/lună**
- Unlimited blurs sent
- No ads
- See who viewed your profile
- Priority în leaderboard
- Exclusive blur filters & frames
- Early access la new features

**In-App Purchases (Coins):**
- 100 coins: $0.99
- 500 coins: $3.99
- 1000 coins: $6.99

**Coin Uses:**
- Unlock blur without inviting friends: 50 coins
- See who sent anonymous compliment: 100 coins
- Boost în leaderboard: 200 coins

### Revenue Projection
- 10,000 users:
  - 5% convert la Plus ($2.99) = $1,495/mo
  - 15% cumpără coins (avg $2) = $3,000/mo
  - Ads (free users): ~$500/mo
  - **Total: ~$5,000/mo**

- 100,000 users:
  - Plus: $14,950/mo
  - Coins: $30,000/mo
  - Ads: $5,000/mo
  - **Total: ~$50,000/mo**

## Out of Scope (v2)

- Video blurs (doar photo în MVP)
- Group blurs (doar 1-to-1)
- Custom blur filters (doar standard blur în MVP)
- Desktop app (doar web browser access)
- Messaging (nu e chat app, doar photo interactions)
- Stories/Posts (nu e social feed, doar blurs)
- Location-based features (doar school matching)
- Direct payment între users

## Launch Strategy

**Week 1:** Soft launch într-o școală pilot (beta testers)
**Week 2-3:** Iterate based pe feedback, fix bugs
**Week 4:** Public launch pe App Store + Google Play + Web
**Week 5+:** Viral marketing pe TikTok, Instagram Reels (UGC content)

## Success Criteria

- **Onboarding completion rate:** >70%
- **D1 retention:** >40% (revine a doua zi)
- **D7 retention:** >25%
- **Viral coefficient:** >1.3 (fiecare user aduce 1.3+ prieteni)
- **Time to first blur sent:** <2 min
- **Daily active usage:** >5 min/day
