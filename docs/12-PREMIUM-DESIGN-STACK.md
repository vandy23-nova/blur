# Premium Design Stack - App Factory

## 🎨 DESIGN SYSTEM OVERVIEW

**Goal:** Impeccable, consistent design across Web, iOS, Android with premium animations and micro-interactions.

---

## 📱 **REACT NATIVE (iOS + Android)**

### Core UI Libraries

**1. React Native Reanimated v3** (Animations)
```bash
npm install react-native-reanimated
```
- 60 FPS animations
- Layout animations
- Shared element transitions
- Best performance (runs on UI thread)

**2. Moti** (Declarative animations)
```bash
npm install moti
```
- Framer Motion for React Native
- Easy, beautiful animations
- Spring physics

**3. React Native Gesture Handler** (Touch interactions)
```bash
npm install react-native-gesture-handler
```
- Smooth gestures
- Pan, pinch, swipe
- Native feel

**4. React Native Paper v5** (Material Design)
```bash
npm install react-native-paper
```
- Material Design 3
- Theming system
- 50+ components

**5. Tamagui** (Universal UI)
```bash
npm install tamagui @tamagui/core
```
- Universal components (Web + Native)
- Optimized performance
- Design tokens

**6. NativeWind v4** (Tailwind for RN)
```bash
npm install nativewind
npm install --save-dev tailwindcss
```
- Tailwind CSS in React Native
- Consistent styling with web

**7. React Native Skia** (Advanced graphics)
```bash
npm install @shopify/react-native-skia
```
- Canvas drawings
- Blur effects
- Glassmorphism
- Gradient masks

**8. React Native Linear Gradient**
```bash
npm install react-native-linear-gradient
```
- Beautiful gradients
- iOS + Android native

**9. React Native Blur**
```bash
npm install @react-native-community/blur
```
- Native blur effects
- Glassmorphism backgrounds

**10. Lottie React Native** (Animations)
```bash
npm install lottie-react-native
```
- After Effects animations
- Lightweight JSON
- Professional animations

---

## 🌐 **NEXT.JS (WEB)**

### Core UI Libraries

**1. Framer Motion** (Animations)
```bash
npm install framer-motion
```
- Production-ready animations
- Page transitions
- Gesture animations
- Layout animations

**2. Radix UI Primitives** (Headless components)
```bash
npm install @radix-ui/react-avatar
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-toast
npm install @radix-ui/react-popover
npm install @radix-ui/react-tabs
npm install @radix-ui/react-switch
npm install @radix-ui/react-slider
```
- Accessible by default (WCAG compliant)
- Unstyled (full control)
- Used by shadcn/ui

**3. shadcn/ui** (Pre-built components)
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add skeleton
```
- Beautiful defaults
- Copy-paste (not npm package)
- Radix under the hood

**4. Class Variance Authority** (Component variants)
```bash
npm install class-variance-authority
```
- Type-safe variants
- Clean API for component states

**5. clsx + tailwind-merge** (Class management)
```bash
npm install clsx tailwind-merge
```
- Conditional classes
- No conflicts

**6. Lucide React** (Icons)
```bash
npm install lucide-react
```
- Beautiful, consistent icons
- Tree-shakeable
- 1000+ icons

**7. React Hot Toast** (Notifications)
```bash
npm install react-hot-toast
```
- Beautiful toasts
- Easy API
- Customizable

**8. Vaul** (Drawer/Sheet)
```bash
npm install vaul
```
- Mobile-first drawer
- Smooth animations
- Gesture-driven

**9. Sonner** (Toast alternative)
```bash
npm install sonner
```
- Beautiful default styles
- Promise-based
- Stacking toasts

**10. Embla Carousel** (Carousels)
```bash
npm install embla-carousel-react
```
- Smooth, performant
- Touch-enabled
- Lightweight

---

## 🎭 **ADVANCED EFFECTS**

### Glassmorphism & Modern Effects

**11. React Particle Background** (Particles)
```bash
npm install particles.js react-particles
```
- Animated backgrounds
- Interactive particles

**12. React Wrap Balancer** (Typography)
```bash
npm install react-wrap-balancer
```
- Balanced text wrapping
- No orphans

**13. React Intersection Observer** (Scroll animations)
```bash
npm install react-intersection-observer
```
- Trigger animations on scroll
- Lazy load

**14. @studio-freight/lenis** (Smooth scroll)
```bash
npm install @studio-freight/lenis
```
- Butter-smooth scrolling
- Momentum-based

---

## 🎨 **DESIGN TOKENS SYSTEM**

### Shared Tokens (Web + Mobile)

```typescript
// design-tokens.ts
export const tokens = {
  colors: {
    primary: {
      DEFAULT: '#8B5CF6', // purple
      50: '#F5F3FF',
      100: '#EDE9FE',
      500: '#8B5CF6',
      900: '#4C1D95',
    },
    secondary: {
      DEFAULT: '#EC4899', // pink
      500: '#EC4899',
    },
    accent: {
      DEFAULT: '#06B6D4', // cyan
      500: '#06B6D4',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      display: 'Cal Sans, Inter, sans-serif',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  animations: {
    duration: {
      fast: 150,
      base: 250,
      slow: 350,
    },
    easing: {
      default: [0.4, 0, 0.2, 1],
      in: [0.4, 0, 1, 1],
      out: [0, 0, 0.2, 1],
      spring: [0.5, 1, 0.89, 1],
    },
  },
};
```

---

## 🚀 **INSTALLATION SCRIPT**

### Web (Next.js)
```bash
#!/bin/bash
# Install Web UI Stack

# Core
npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge

# Radix Primitives
npm install @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-toast @radix-ui/react-popover @radix-ui/react-tabs @radix-ui/react-switch @radix-ui/react-slider

# Toasts & Notifications
npm install react-hot-toast sonner

# Advanced
npm install vaul embla-carousel-react react-wrap-balancer react-intersection-observer @studio-freight/lenis

# shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input dialog toast dropdown-menu avatar badge skeleton tabs switch slider
```

### Mobile (React Native)
```bash
#!/bin/bash
# Install Mobile UI Stack

# Core Animations
npm install react-native-reanimated react-native-gesture-handler moti

# UI Components
npm install react-native-paper tamagui @tamagui/core nativewind

# Effects
npm install @shopify/react-native-skia react-native-linear-gradient @react-native-community/blur

# Animations
npm install lottie-react-native

# Dev Dependencies
npm install --save-dev tailwindcss
```

---

## 📐 **COMPONENT ARCHITECTURE**

### Atomic Design Pattern

```
components/
├── atoms/           # Smallest units
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Icon.tsx
├── molecules/       # Simple composites
│   ├── SearchBar.tsx
│   ├── Card.tsx
│   └── Toast.tsx
├── organisms/       # Complex composites
│   ├── Header.tsx
│   ├── Feed.tsx
│   └── Modal.tsx
├── templates/       # Page layouts
│   ├── DashboardLayout.tsx
│   └── AuthLayout.tsx
└── ui/             # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    └── ...
```

---

## 🎬 **ANIMATION PATTERNS**

### Framer Motion (Web)
```tsx
// Fade in on mount
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Stagger children
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {items.map(item => (
    <motion.div variants={childVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Reanimated (Mobile)
```tsx
// Spring animation
const translateY = useSharedValue(0);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: translateY.value }]
}));

// Trigger
translateY.value = withSpring(100, {
  damping: 15,
  stiffness: 100
});

<Animated.View style={animatedStyle}>
  <Content />
</Animated.View>
```

---

## 🌈 **GLASSMORPHISM TEMPLATE**

### Web (Tailwind)
```tsx
<div className="
  backdrop-blur-xl 
  bg-white/10 
  border border-white/20 
  rounded-2xl 
  shadow-2xl 
  p-6
">
  Glass card content
</div>
```

### Mobile (Skia)
```tsx
import { Canvas, Blur, RoundedRect } from '@shopify/react-native-skia';

<Canvas style={{ flex: 1 }}>
  <RoundedRect
    x={20}
    y={20}
    width={200}
    height={100}
    r={16}
    color="rgba(255, 255, 255, 0.1)"
  >
    <Blur blur={10} />
  </RoundedRect>
</Canvas>
```

---

## ✅ **QUALITY CHECKLIST**

Every component must have:
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Dark mode support
- [ ] Accessibility (ARIA labels, keyboard nav)
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Smooth animations (60 FPS)
- [ ] Gesture support (mobile)
- [ ] TypeScript types
- [ ] Storybook example (optional)

---

## 📚 **RESOURCES**

**Inspiration:**
- https://dribbble.com/tags/mobile-app
- https://mobbin.com (mobile app patterns)
- https://www.lapa.ninja (web design)
- https://uijar.com (component examples)

**Animations:**
- https://www.framer.com/motion (Framer Motion docs)
- https://docs.swmansion.com/react-native-reanimated (Reanimated)
- https://lottiefiles.com (Lottie animations)

**Design Systems:**
- https://www.radix-ui.com (Radix docs)
- https://ui.shadcn.com (shadcn/ui examples)
- https://tamagui.dev (Tamagui docs)

---

**Status:** Design stack documented. Ready for installation in new projects.
