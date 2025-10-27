# BetterFocus - ADHD Productivity App

**Productivity Built For Your ADHD Brain**

BetterFocus is a modern, ADHD-friendly productivity application built with React, TypeScript, and Tailwind CSS. Designed specifically for neurodivergent minds, it features task management, visual focus timers, gamification, mindfulness tools, and flexible organization.

## 🌟 Features

- **Quick Task Capture**: Voice or text entry with auto-organization
- **Visual Focus Timers**: Customizable Pomodoro-style work/break cycles
- **Gamification System**: XP, levels, streaks, and achievements
- **Mindfulness Tools**: Guided breathing exercises and focus resets
- **Flexible Organization**: Smart auto-tagging and adaptive sorting
- **Multi-language Support**: English, Spanish, French, and German
- **Beautiful UI**: Dark theme with cyan accent (#0dd5c8) and smooth animations
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Animations**: Framer Motion + AOS (Animate On Scroll)
- **Internationalization**: i18next + react-i18next
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx      # Main navigation
│   ├── Footer.tsx      # Site footer
│   └── SEO.tsx         # SEO meta tag manager
├── pages/              # Route pages
│   ├── Home.tsx        # Landing page
│   ├── Dashboard.tsx   # Main app dashboard
│   ├── Tasks.tsx       # Task management
│   ├── Focus.tsx       # Focus timer
│   └── Progress.tsx    # User progress tracking
├── i18n/               # Internationalization
│   └── locales/        # Translation files
├── lib/                # Utility functions
│   ├── storage.ts      # LocalStorage helpers
│   └── utils.ts        # General utilities
├── hooks/              # Custom React hooks
├── index.css           # Global styles & design system
└── App.tsx             # Root component

```

## 🎨 Design System

BetterFocus uses a comprehensive design system defined in `src/index.css`:

- **Primary Color**: #0dd5c8 (cyan/teal)
- **Background**: #161616 (dark)
- **Typography**: Geist font family
- **Animations**: Smooth transitions, glow effects, hover lifts
- **Components**: Glass morphism, gradient buttons, semantic color tokens

All colors use HSL values for better theming support.

## 🌐 Deployment

### Via Lovable

Simply open [Lovable](https://lovable.dev/projects/59184d7f-8662-421a-a52b-e344f08a74c4) and click on Share → Publish.

### Manual Deployment

#### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. The `_redirects` file handles SPA routing automatically

#### Vercel

1. Import your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

## 🔧 Available Scripts

```sh
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌍 Custom Domain

To connect a custom domain:
1. Navigate to Project > Settings > Domains in Lovable
2. Click "Connect Domain"
3. Follow the DNS configuration instructions

[Learn more about custom domains](https://docs.lovable.dev/features/custom-domain)

## 📱 Progressive Web App (PWA)

BetterFocus includes PWA support via `manifest.json`:
- Installable on mobile devices
- Offline-capable (when service worker is added)
- Native app-like experience

## 🔍 SEO Features

- Dynamic meta tags with SEO component
- Open Graph tags for social sharing
- Twitter Card support
- Sitemap.xml for search engines
- Semantic HTML5 structure
- robots.txt for crawler control

## 🧪 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

This project is managed via Lovable. To contribute:
1. Make changes via Lovable or your IDE
2. Commit changes to the repository
3. Changes sync automatically

## 🔗 Links

- **Project URL**: https://lovable.dev/projects/59184d7f-8662-421a-a52b-e344f08a74c4
- **Documentation**: https://docs.lovable.dev
- **Support**: Contact via the app's contact form

---

Built with ❤️ for ADHD minds everywhere
