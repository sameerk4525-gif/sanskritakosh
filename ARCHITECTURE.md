# 🏗️ ARCHITECTURE GUIDE

Complete technical architecture of SanskritKosh.

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      USER BROWSER                           │
│                  (Next.js Frontend App)                      │
│         http://localhost:3000 (Development)                 │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/CORS
                         │
┌────────────────────────▼────────────────────────────────────┐
│              EXPRESS API SERVER                              │
│         http://localhost:4000/api/v1                         │
│    - REST endpoints for all operations                       │
│    - JWT authentication & authorization                      │
│    - Request validation with Zod                             │
│    - Rate limiting & CORS                                    │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼────────┐  ┌────▼────────┐  ┌──▼────────────┐
│  PostgreSQL    │  │   Redis     │  │  Cloudinary   │
│  (Primary DB)  │  │  (Cache)    │  │   (CDN)       │
│                │  │             │  │               │
│ - Users        │  │ - Dictionary│  │ - Audio files │
│ - Content      │  │   cache     │  │ - Images      │
│ - Bookmarks    │  │ - Session   │  │ - Videos      │
│ - Progress     │  │   data      │  │               │
└────────────────┘  └─────────────┘  └───────────────┘
```

## Directory Structure

### Frontend (apps/web/)

```
apps/web/
├── app/                              # Next.js 14 App Router
│   ├── layout.tsx                    # Root layout wrapper
│   ├── globals.css                   # Global styles (CSS variables)
│   ├── (public)/                     # Public route group
│   │   ├── page.tsx                  # Home page
│   │   ├── grammar/page.tsx          # Grammar hub
│   │   ├── dictionary/page.tsx       # Dictionary
│   │   ├── subhashit/page.tsx        # Subhashits
│   │   ├── songs/page.tsx            # Songs
│   │   ├── stories/page.tsx          # Stories
│   │   ├── daily/page.tsx            # Daily learning
│   │   ├── numbers/page.tsx          # Numbers
│   │   ├── about/page.tsx            # About page
│   │   └── contact/page.tsx          # Contact form
│   ├── (auth)/                       # Auth route group
│   │   ├── login/page.tsx            # Login
│   │   ├── register/page.tsx         # Register
│   │   └── account/page.tsx          # User account
│   └── admin/                        # Admin panel
│       ├── layout.tsx                # Admin layout
│       ├── page.tsx                  # Dashboard
│       ├── grammar/page.tsx          # Manage grammar
│       ├── dictionary/page.tsx       # Manage dictionary
│       ├── subhashit/page.tsx        # Manage subhashits
│       ├── songs/page.tsx            # Manage songs
│       ├── stories/page.tsx          # Manage stories
│       └── users/page.tsx            # Manage users
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Top navigation
│   │   ├── MobileMenu.tsx            # Mobile bottom nav
│   │   ├── Footer.tsx                # Footer
│   │   └── Breadcrumb.tsx            # Breadcrumbs
│   ├── home/
│   │   ├── HeroBanner.tsx            # Hero with Om symbol
│   │   ├── QuickSearch.tsx           # Search bar
│   │   ├── DailyWordCard.tsx         # Word of the day
│   │   ├── FeaturedSubhashit.tsx     # Featured shloka
│   │   └── CategoryGrid.tsx          # 6-category grid
│   ├── grammar/
│   │   ├── TopicCard.tsx
│   │   ├── DhaturupaTable.tsx        # Verb conjugation
│   │   ├── ShabdarupaTable.tsx       # Noun declension
│   │   └── SandhiVisualizer.tsx      # Sandhi rules
│   ├── dictionary/
│   │   ├── SearchBar.tsx
│   │   ├── WordCard.tsx
│   │   └── SearchResults.tsx
│   ├── content/
│   │   ├── SubhashitCard.tsx
│   │   ├── StoryCard.tsx
│   │   ├── SongCard.tsx
│   │   ├── AudioPlayer.tsx           # Howler.js wrapper
│   │   ├── BookmarkButton.tsx        # Add to bookmarks
│   │   └── ShareButton.tsx           # Share content
│   ├── ui/
│   │   ├── Button.tsx                # Reusable button
│   │   ├── Card.tsx                  # Card wrapper
│   │   ├── Badge.tsx                 # Status badges
│   │   ├── Skeleton.tsx              # Loading state
│   │   ├── Modal.tsx                 # Dialog
│   │   ├── Toast.tsx                 # Notifications
│   │   └── Tabs.tsx                  # Tab navigation
│   └── admin/
│       ├── AdminSidebar.tsx          # Admin nav
│       ├── ContentForm.tsx           # Generic form
│       ├── DataTable.tsx             # Data table
│       └── MediaUploader.tsx         # File upload
├── lib/
│   ├── api.ts                        # Axios client
│   ├── search.ts                     # Fuse.js setup
│   ├── bookmarks.ts                  # Bookmark helpers
│   ├── audio.ts                      # Audio utilities
│   └── utils.ts                      # Helper functions
├── store/
│   ├── useBookmarkStore.ts           # Zustand: bookmarks
│   ├── useSearchStore.ts             # Zustand: search
│   └── useUserStore.ts               # Zustand: auth
├── types/
│   └── index.ts                      # TypeScript types
├── public/
│   ├── fonts/                        # Devanagari fonts
│   ├── icons/                        # SVG icons
│   └── og-image.png                  # Social image
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind setup
├── tsconfig.json                     # TypeScript config
├── postcss.config.js                 # PostCSS config
└── package.json
```

### Backend (apps/api/)

```
apps/api/
├── src/
│   ├── index.ts                      # Express app entry
│   ├── routes/
│   │   ├── grammar.ts                # GET /grammar/*
│   │   ├── dictionary.ts             # GET /dictionary/*
│   │   ├── subhashit.ts              # GET /subhashit/*
│   │   ├── songs.ts                  # GET /songs/*
│   │   ├── stories.ts                # GET /stories/*
│   │   ├── daily.ts                  # GET /daily/*
│   │   ├── bookmarks.ts              # POST/DELETE /bookmarks
│   │   ├── auth.ts                   # POST /auth/*
│   │   ├── admin.ts                  # POST /admin/*
│   │   └── contact.ts                # POST /contact
│   ├── controllers/
│   │   ├── grammarController.ts
│   │   ├── dictionaryController.ts
│   │   └── ...
│   ├── middleware/
│   │   ├── auth.ts                   # JWT verification
│   │   ├── errorHandler.ts           # Error handling
│   │   └── rateLimiter.ts           # Rate limiting
│   ├── services/
│   │   ├── grammarService.ts         # Business logic
│   │   ├── dictionaryService.ts
│   │   └── ...
│   ├── utils/
│   │   ├── cloudinary.ts             # Media upload
│   │   ├── redis.ts                  # Cache helpers
│   │   └── jwt.ts                    # Token generation
│   └── prisma/
│       ├── schema.prisma             # Database schema
│       └── seed.ts                   # Seed script
├── tsconfig.json
└── package.json
```

### Shared (packages/shared/)

```
packages/shared/
├── src/
│   ├── types/
│   │   └── index.ts                  # Shared TypeScript types
│   ├── schemas/
│   │   └── index.ts                  # Zod validation schemas
│   └── index.ts                      # Export all
└── package.json
```

## Data Flow

### 1. User Request Flow

```
User Action
    ↓
React Component
    ↓
Zustand Store (State Update)
    ↓
API Call (Axios)
    ↓
Express API Route
    ↓
Middleware (Auth, Validation)
    ↓
Database/Cache Query (Prisma)
    ↓
Response (JSON)
    ↓
Zustand Store (Update)
    ↓
Component Re-render
```

### 2. Authentication Flow

```
User Login Form
    ↓
POST /api/auth/login
    ↓
Validate credentials (bcryptjs)
    ↓
Generate JWT token
    ↓
Return token to client
    ↓
Store in localStorage + Zustand
    ↓
Attach to Authorization header
    ↓
verifyToken middleware checks JWT
```

### 3. Caching Strategy

```
Client Request
    ↓
Check Redis Cache
    ↓
Cache Hit? → Return cached data
    ↓
Cache Miss? → Query database
    ↓
Set cache (TTL: 5 minutes)
    ↓
Return data
```

## Database Schema Overview

### Core Tables

**Users**
- Authentication & Profile
- Links: Bookmarks, Progress

**GrammarTopic**
- Learning modules
- JSON content blocks
- Link: Progress tracking

**DictionaryWord**
- Vocabulary entries
- Full details (gender, type, meanings)
- Full-text search index

**Subhashit, Song, Story**
- Content items
- Bookmark tracking
- Publication status

**Bookmark**
- User content saves
- N-M relationship table
- Unique constraint: userId + contentType + contentId

**Progress**
- Learning tracking
- Completion status
- Timestamp tracking

**DailyContent**
- Daily assignment
- Content type + ID reference
- Unique per date

## API Response Pattern

All responses follow this structure:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page?: number;
    total?: number;
    limit?: number;
  };
}
```

## State Management

### Zustand Stores

**useUserStore**
- Current user
- Auth token
- Loading state

**useBookmarkStore**
- LocalStorage + server sync
- Bookmarked items map
- Add/remove/check methods

**useSearchStore**
- Current query
- Search results
- Recent searches

## Performance Optimization

### Frontend

1. **Code Splitting**
   - Dynamic route imports
   - Component lazy loading

2. **Image Optimization**
   - Next.js Image component
   - WebP format
   - srcSet with sizes

3. **Caching**
   - Redux DevTools persistence
   - Browser cache headers
   - Service worker (PWA)

4. **Bundle Size**
   - Tree shaking
   - Minification
   - Target: <150KB JS

### Backend

1. **Database**
   - Indexed columns: slug, email, word
   - Query optimization
   - Connection pooling

2. **Redis Cache**
   - Dictionary lookups (TTL: 5min)
   - Daily content
   - Search results

3. **API Optimization**
   - Pagination (20 items/page)
   - Field selection (only needed fields)
   - Response compression

## Security

### Frontend
- httpOnly cookies for tokens
- CSRF protection
- XSS prevention via React escaping

### Backend
- JWT verification on protected routes
- Role-based access control
- Rate limiting
- Input validation with Zod
- SQL injection prevention (Prisma ORM)
- Environment variables for secrets

## Deployments

### Development
- Local: Frontend port 3000, API port 4000
- Database: Local PostgreSQL

### Production
- Frontend: Vercel
- API: Railway/Render
- Database: Managed PostgreSQL
- CDN: Cloudinary for media

---

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)
For development workflow, see [CONTRIBUTING.md](CONTRIBUTING.md)
