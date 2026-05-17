# 🕉️ SanskritKosh - Complete Sanskrit Learning Platform

A modern, mobile-first Sanskrit learning platform featuring grammar, vocabulary, classical texts, and spiritual resources.

## 📋 Project Overview

**SanskritKosh (संस्कृतकोश)** is a comprehensive Sanskrit learning platform designed for absolute beginners and intermediate learners. It combines traditional Sanskrit pedagogy with modern web technologies to create an accessible, engaging learning experience.

### Key Features

- 📚 **Grammar Module**: Structured learning of Sanskrit grammar (Varnamala, Sandhi, Samas, Dhaturupa, Shabdarupa, Paninian Sutras)
- 📖 **Dictionary**: Searchable Sanskrit-English dictionary with full etymological information
- 🌟 **Subhashits**: Classical wisdom-verses with translations and commentary
- 🎵 **Songs**: Classical Sanskrit songs and Bhagavad Gita passages
- 📖 **Stories**: Sanskrit texts with simplified English explanations
- 📱 **Daily Learning**: Daily Sanskrit word, subhashit, and grammar tip
- 🔢 **Numbers**: Learn Sanskrit numerals
- 👤 **User Accounts**: Track learning progress, bookmarks, and streaks
- 🔐 **Admin Panel**: Manage all content through a dedicated admin interface
- 📱 **PWA**: Install as an app and learn offline

## 🏗️ Architecture

### Monorepo Structure

```
sanskritakosh/
├── apps/
│   ├── web/          # Next.js 14 frontend
│   └── api/          # Express.js backend
├── packages/
│   └── shared/       # Shared types & schemas
└── package.json      # Workspace root
```

### Tech Stack

**Frontend:**
- Next.js 14 (App Router) with TypeScript
- Tailwind CSS + custom CSS variables
- Zustand for state management
- Framer Motion for animations
- Fuse.js for client-side search
- Howler.js for audio playback
- next-pwa for PWA support

**Backend:**
- Express.js with TypeScript
- Prisma ORM
- PostgreSQL (primary database)
- Redis (caching)
- JWT authentication
- Zod for validation

**Infrastructure:**
- Vercel (frontend hosting)
- Railway/Render (backend + database)
- Cloudinary (media CDN)

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL 12+
- Redis (optional, for caching)

### Installation

1. **Clone and install:**
   ```bash
   git clone <repository>
   cd sanskritakosh
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Fill in your environment variables
   ```

3. **Set up database:**
   ```bash
   cd apps/api
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

   Frontend runs on `http://localhost:3000`
   API runs on `http://localhost:4000`

## 📚 Database Schema

Key models:
- **User**: Authentication and tracking
- **GrammarTopic**: Grammar lessons by category
- **DictionaryWord**: Sanskrit vocabulary with details
- **Subhashit**: Wisdom verses
- **Song**: Classical Sanskrit songs
- **Story**: Sanskrit stories
- **Bookmark**: User bookmarked content
- **Progress**: Learning progress tracking
- **DailyContent**: Daily learning content assignments

## 🛣️ API Routes

All routes are prefixed with `/api/v1`

### Public Routes
- `GET /grammar/topics` - List grammar topics
- `GET /subhashit` - List subhashits with pagination
- `GET /dictionary/search?q=` - Search dictionary
- `GET /daily/today` - Today's learning content
- `POST /contact` - Contact form submission

### Authenticated Routes
- `GET /auth/me` - Current user profile
- `GET /bookmarks` - User's bookmarks
- `POST /bookmarks` - Add bookmark
- `GET /progress`-Learning progress

### Admin Routes
- `GET/POST /admin/grammar` - Manage grammar topics
- `GET/POST /admin/subhashit` - Manage subhashits
- `GET/POST /admin/dictionary` - Manage dictionary
- `GET /admin/stats` - Dashboard statistics

## 🎨 Design System

### Color Palette
- **Primary**: Deep saffron brown (#8B4513)
- **Accent**: Gold (#C9A84C)
- **Background**: Warm off-white (#FDF8F0)
- **Text**: Dark warm (#1A0A00)

### Typography
- **Sanskrit**: Tiro Devanagari Sanskrit font
- **English**: Crimson Pro serif
- **UI**: DM Sans sans-serif

### Components
All components follow a consistent card-based design with subtle borders and shadows.

## 📱 Mobile Optimization

- Mobile-first design (starting at 375px)
- Bottom tab navigation on mobile
- Touch-friendly 44px minimum tap targets
- PWA support for offline access
- Responsive images with Next.js Image component

## 🔐 Authentication & Authorization

- JWT-based stateless authentication
- Roles: USER, ADMIN, SUPER_ADMIN
- httpOnly cookies for token storage
- Admin guard middleware on protected routes

## 🚢 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
```

### Backend (Railway/Render)
```bash
npm run build
# Configure for production
npm run migrate:deploy
```

### Environment Variables
See `.env.example` for required variables.

## 📖 Content Guidelines

Sanskrit text should always:
- Use proper Devanagari font (Tiro Devanagari Sanskrit)
- Include IAST transliteration in translations
- Provide English and Hindi meanings
- Include etymological information where relevant
- Add examples in usage contexts

##  🔄 Development Workflow

1. **Create feature branch**: `git checkout -b feature/feature-name`
2. **Make changes and test locally**
3. **Run linting and type checks**: `npm run lint && npm run type-check`
4. **Commit with clear messages**: `git commit -m "feat: add feature"`
5. **Push and create pull request**

## 📊 Performance Targets

- Lighthouse Mobile Score: 85+
- Accessibility Score: 90+
- Initial JS Bundle: <150KB
- Dictionary Search: <500ms
- API Response Time: <200ms

## 🙏 Philosophy

This platform is built with devotion to the Sanskrit language and its cultural heritage. Every design decision prioritizes:
- Respect for Sanskrit and Indian culture
- Accessibility for beginners
- Mobile-first usability
- Performance and reliability
- Spiritual and aesthetic harmony

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md for guidelines.

## 📫 Contact

- Email: hello@sanskritakosh.com
- GitHub: [link-to-repo]

---

**Built with devotion to preserve and share Sanskrit knowledge.** 🕉️
