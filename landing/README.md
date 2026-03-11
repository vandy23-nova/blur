# Blur - Landing Page

A modern, viral-ready landing page for Blur - the anonymous photo reveal social app for Gen Z.

## ✨ Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive design** - mobile-first approach
- **Static generation** for blazing-fast performance
- **SEO optimized** with meta tags and Open Graph
- **Animated gradients** and smooth transitions
- **Production-ready** for Vercel deployment

## 🎨 Design

- **Colors:** Purple (#8B5CF6) and Pink (#EC4899)
- **Style:** Bold, modern, Gen Z-focused
- **Sections:** Hero, Features, How It Works, Download, Footer
- **Icons:** Lucide React icons

## 🚀 Quick Start

### Install dependencies:
```bash
npm install
```

### Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production:
```bash
npm run build
```

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/blur-landing.git
git push -u origin main
```

2. Deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

## 📁 Project Structure

```
blur-landing/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main landing page
│   └── globals.css       # Global styles + Tailwind
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript config
└── next.config.js        # Next.js config (static export)
```

## 🎯 Customization

### Change Colors:
Edit `tailwind.config.js`:
```js
colors: {
  purple: {
    primary: '#8B5CF6',  // Your purple
  },
  pink: {
    primary: '#EC4899',   // Your pink
  },
}
```

### Update Content:
Edit `app/page.tsx` to change text, stats, features, etc.

### Add Images:
Place images in `public/` folder and reference as `/image.png`

## 🔧 Environment Variables

No environment variables required for basic deployment.

## 📱 Mobile-First

This landing page is built mobile-first and fully responsive:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## ⚡ Performance

- Static generation (SSG) for instant loads
- Optimized animations with CSS
- Minimal JavaScript bundle
- Fast build times

## 📄 License

MIT License - feel free to use for your projects!

## 🙋 Support

For issues or questions, open an issue on GitHub or contact the development team.

---

Built with 💜 for Gen Z
