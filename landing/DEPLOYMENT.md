# Blur Landing Page - Deployment Guide

## ✅ Pre-Deployment Checklist

1. **Build locally first:**
   ```bash
   npm run build
   ```
   Verify no errors.

2. **Test production build:**
   ```bash
   npm start
   ```
   Check http://localhost:3000

3. **Add assets:**
   - [ ] `public/og-image.png` (1200×630px, for social sharing)
   - [ ] `public/favicon.ico` (app icon for browser tabs)
   - [ ] Any other images referenced in code

4. **Update metadata** in `app/layout.tsx`:
   - Site URL
   - Description
   - Open Graph image URL

## 🚀 Deploy to Vercel (Recommended)

### Option A: Vercel CLI (Fastest - 2 minutes)

```bash
# 1. Install Vercel CLI (one-time setup)
npm i -g vercel

# 2. Navigate to project
cd projects/blur/landing

# 3. Deploy to production
vercel --prod
```

**Follow the prompts:**
- Login to Vercel (opens browser)
- Link to existing project or create new one
- Confirm deployment settings
- Done! You'll get a live URL

### Option B: GitHub + Vercel Dashboard (Best for teams)

```bash
# 1. Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Blur landing page"

# 2. Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/blur-landing.git
git branch -M main
git push -u origin main
```

**Then on Vercel:**
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `blur-landing` repo
4. Vercel auto-detects Next.js settings
5. Click "Deploy"
6. Get your live URL: `https://blur-landing.vercel.app`

### Option C: Vercel CLI with Token (CI/CD / Automation)

```bash
# Use environment variable for token
export VERCEL_TOKEN="your_token_here"

# Deploy in non-interactive mode
vercel --token $VERCEL_TOKEN --prod --yes
```

## 🌐 Custom Domain Setup

Once deployed on Vercel:

1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `blur.app`)
4. Follow DNS instructions:
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → Vercel's IP
5. Wait for DNS propagation (~10 minutes)
6. SSL certificate auto-provisions ✓

## 📊 Post-Deployment

### Verify deployment:
- [ ] Open live URL
- [ ] Test on mobile (responsive check)
- [ ] Share link on social media (Open Graph preview)
- [ ] Check browser console for errors
- [ ] Test all buttons and links

### Optional: Add analytics

**Vercel Analytics** (built-in):
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Google Analytics:**
Add to `app/layout.tsx` in `<head>`:
```typescript
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `
}} />
```

## 🔄 Continuous Deployment

With GitHub + Vercel integration:
- Every push to `main` → auto-deploy to production
- Pull requests → deploy to preview URLs
- Zero configuration needed

## ⚙️ Environment Variables (if needed)

If you add API keys or secrets later:

1. **Local development:**
   Create `.env.local`:
   ```bash
   NEXT_PUBLIC_API_KEY=your_key_here
   ```

2. **Vercel deployment:**
   ```bash
   vercel env add NEXT_PUBLIC_API_KEY production
   ```
   Or add via dashboard: Settings → Environment Variables

## 🐛 Troubleshooting

### Build fails on Vercel?
- Check Node.js version (18.x or 20.x)
- Verify `package.json` has all dependencies
- Check build logs for specific errors

### 404 on refresh?
Next.js handles this automatically with App Router. If issues:
- Verify `next.config.js` doesn't have `output: 'export'`
- Check routing matches Next.js conventions

### Slow loading?
- Enable Vercel Analytics to identify bottlenecks
- Check image sizes (compress large images)
- Verify static generation is working (check build output)

### OG image not showing on social media?
- Ensure `public/og-image.png` exists
- Full URL required: `https://yourdomain.com/og-image.png`
- Use https://www.opengraph.xyz/ to test

## 📈 Performance Optimization (Already Done!)

This landing page is already optimized:
- ✅ Static generation (SSG)
- ✅ Minimal JavaScript bundle
- ✅ CSS Modules (scoped, tree-shaken)
- ✅ System fonts (no font loading)
- ✅ Pure CSS animations (GPU-accelerated)

No further optimization needed for a landing page!

## 🎉 You're Live!

Your Blur landing page is now:
- Deployed globally on Vercel's CDN
- Auto-scaling to handle traffic
- HTTPS enabled
- Accessible worldwide in <100ms

**Next steps:**
- Share the URL with your team
- Monitor analytics
- Iterate based on user feedback
- Consider A/B testing different CTAs

---

**Questions?**
- Vercel docs: https://vercel.com/docs
- Next.js deployment: https://nextjs.org/docs/deployment
- This project's README: See `README.md` in this folder
