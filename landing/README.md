# Blur - Landing Page

A modern, high-performance landing page for Blur - the viral anonymous photo reveal social app for Gen Z.

## ✨ Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Vanilla CSS** with CSS Modules (no framework bloat!)
- **Fully responsive** - mobile-first design
- **Optimized performance** - static generation, minimal JS
- **SEO ready** with meta tags and Open Graph
- **Smooth animations** using CSS keyframes
- **Production-ready** for instant Vercel deployment

## 🎨 Design

- **Colors:** Purple (#8B5CF6) and Pink (#EC4899)
- **Typography:** System fonts for instant loading
- **Style:** Bold, modern, Gen Z aesthetic
- **Sections:** Hero, Features, How It Works, Download, Footer
- **Icons:** Lucide React (lightweight)

## 🚀 Quick Start

### 1. Install dependencies

```bash
cd projects/blur/landing
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

### 3. Build for production

```bash
npm run build
npm start
```

## 📦 Deployment to Vercel

### Method 1: Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Deploy to production
cd projects/blur/landing
vercel --prod
```

### Method 2: GitHub + Vercel Dashboard

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Blur landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/blur-landing.git
git push -u origin main
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js - just click "Deploy"

### Method 3: Vercel CLI with Token (CI/CD)

```bash
vercel --token YOUR_VERCEL_TOKEN --prod
```

## 📁 Project Structure

```
blur-landing/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main landing page component
│   ├── globals.css         # Global CSS variables & animations
│   └── styles.module.css   # Component-specific CSS modules
├── public/                 # Static assets (add images here)
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript config
├── package.json            # Dependencies
└── README.md               # You are here

```

## 🎯 Customization

### Change Colors

Edit `app/globals.css`:
```css
:root {
  --purple: #8B5CF6;  /* Your brand purple */
  --pink: #EC4899;    /* Your brand pink */
}
```

### Update Content

Edit `app/page.tsx`:
- Change stats (2M users, 50M blurs, etc.)
- Modify features and descriptions
- Update CTA button text
- Customize footer links

### Add Images

1. Place images in `public/` folder
2. Reference as `/image-name.png` in code
3. For Open Graph image: add `public/og-image.png` (1200×630px)

## ⚡ Performance

- **100% static generation** - no server needed
- **Minimal JavaScript** - only React hydration
- **CSS Modules** - scoped styles, no conflicts
- **System fonts** - zero font loading time
- **Optimized animations** - pure CSS, GPU-accelerated

### Lighthouse Scores (Expected)
- Performance: 95-100
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 100

## 🔧 Environment Variables

No environment variables required for the landing page.

Add a `.env.local` if you need analytics or other integrations:
```bash
# Example for analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📱 Responsive Breakpoints

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+

All layouts adapt fluidly using CSS Grid and Flexbox.

## 🐛 Troubleshooting

### Build fails?
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Types not working?
```bash
npm install --save-dev typescript @types/react @types/node
```

### Vercel deployment fails?
- Check `next.config.js` is present
- Ensure `package.json` has correct scripts
- Verify Node version (18.x or 20.x recommended)

## 📄 License

MIT - Free to use for your projects!

## 🚢 Deployment Checklist

Before deploying:
- [ ] Update meta descriptions in `app/layout.tsx`
- [ ] Add `public/og-image.png` (1200×630px)
- [ ] Add `public/favicon.ico`
- [ ] Test on mobile devices
- [ ] Run `npm run build` locally first
- [ ] Update footer links (privacy, terms, etc.)

## 🙋 Support

For issues or questions about the landing page code, check:
- Next.js docs: https://nextjs.org/docs
- React docs: https://react.dev
- CSS Modules: https://github.com/css-modules/css-modules

---

**Built with 💜 for Blur • Production-ready in 15 minutes**
