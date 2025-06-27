# Moon Phase Compatibility App - Static Version

A cosmic compatibility application that calculates romantic compatibility between two people based on their birth dates or celebrity matches using moon phases, zodiac signs, and astrological elements. **Now optimized for Cloudflare Pages deployment with 100% client-side calculations.**

## 🚀 Quick Deploy to Cloudflare Pages

### Option 1: Direct GitHub Deploy
1. Push this repository to GitHub
2. Go to Cloudflare Pages dashboard
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist/public`
6. Deploy!

### Option 2: Manual Deploy
1. Run `npm run build` locally
2. Upload the `dist/public` folder to Cloudflare Pages
3. Configure custom domain (optional)

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## ✨ What Changed

This version has been completely converted from a full-stack application to a static site:

### ✅ Removed
- Express.js server
- API endpoints (`/api/compatibility`, `/api/celebrities/search`)
- Database dependencies (Drizzle ORM, PostgreSQL)
- TanStack React Query for server state
- Server-side storage and sessions

### ✅ Added
- **Client-side compatibility calculations** using existing lunar algorithms
- **URL-based result sharing** (Base64 encoded parameters)
- **Local celebrity search** (no API calls needed)
- **Static build configuration** optimized for CDN deployment

### ✅ Preserved
- **All original functionality** - date/celebrity compatibility checks
- **Cosmic UI design** - same beautiful interface
- **Moon phase calculations** - enhanced lunar data engine
- **Celebrity database** - 50+ pre-loaded celebrities
- **Responsive design** - works on all devices

## 🧠 Technical Architecture

### Frontend-Only Stack
- **React 18** with TypeScript
- **Wouter** for client-side routing  
- **Shadcn/ui** components with Radix UI
- **Tailwind CSS** with cosmic theme
- **Vite** for build optimization

### Client-Side Features
- **Lunar Data Engine**: Calculates moon phases, zodiac signs, and compatibility scores
- **Celebrity Search**: Instant local search through celebrity database
- **Result Sharing**: Shareable URLs with encoded compatibility data
- **Responsive Design**: Mobile-first cosmic-themed interface

### Data Sources
- **Moon Calculations**: Astronomical algorithms for lunar phases and zodiac positions
- **Celebrity Data**: Pre-loaded database with birth dates and images
- **Compatibility Logic**: Multi-factor scoring system (moon phases, elements, zodiac)

## 📁 Project Structure

```
client/
├── src/
│   ├── components/       # UI components
│   ├── data/            # Celebrity database & moon data
│   ├── lib/             # Calculation engines
│   │   ├── clientCompatibility.ts   # Main compatibility logic
│   │   ├── moonCalculator.ts        # Moon phase calculations
│   │   ├── compatibilityEngine.ts   # Scoring algorithms
│   │   └── lunarDataEngine.ts       # Enhanced lunar data
│   ├── pages/           # Route components
│   └── App.tsx          # Main application
├── index.html           # Entry point
└── public/              # Static assets

dist/public/             # Built static files (deploy this!)
_redirects               # Cloudflare Pages SPA routing
```

## 🌙 How It Works

1. **Input Selection**: Users choose between date-date, date-celebrity, or celebrity-celebrity comparisons
2. **Client Calculation**: JavaScript calculates moon phases, zodiac signs, and compatibility scores
3. **Results Display**: Shows detailed compatibility analysis with cosmic visualizations
4. **URL Sharing**: Results are shareable via encoded URLs (no server storage needed)

## 🎯 Compatibility Features

- **Moon Phase Analysis**: 8 distinct lunar phases with unique energy patterns
- **Zodiac Compatibility**: 12 astrological signs with element relationships
- **Illumination Scoring**: Lunar brightness affects compatibility calculations
- **Energy Matching**: Phase-specific energies (Renewal, Growth, Action, etc.)
- **Soulmate Detection**: Scores ≥85% trigger special soulmate status

## 🔗 Deployment Notes

- **No server required** - Pure static site
- **Fast loading** - Optimized Vite build with code splitting
- **SEO friendly** - Meta tags and Open Graph support
- **Mobile optimized** - Responsive design works on all devices
- **CDN ready** - Perfect for Cloudflare Pages global distribution

## 📊 Performance

- **Instant calculations** - No API delays
- **Offline capable** - Works without internet after initial load
- **Lightweight** - Optimized bundle sizes with tree shaking
- **Fast search** - Client-side celebrity filtering

---

## 🌟 Original Credits

Based on the moon phase compatibility concept with enhanced astronomical calculations and a beautiful cosmic interface design.

**Live Demo**: Deploy to your Cloudflare Pages and share the URL!