# 🔗 BACKEND API ENDPOINTS - COMPLETE GUIDE

## Base URL
```
http://localhost:3001/api/v1
```

---

## 📚 **GRAMMAR ENDPOINTS**

### Get all grammar topics
```
GET /api/v1/grammar/topics
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20)
  - category: string (INTRODUCTION, PHONETICS, NOUNS, VERBS, etc.)
  - level: string (BEGINNER, INTERMEDIATE, ADVANCED)

Example:
GET /api/v1/grammar/topics?page=1&limit=10&level=BEGINNER
```

### Get single grammar topic by slug
```
GET /api/v1/grammar/topics/:slug

Example:
GET /api/v1/grammar/topics/devanagari-script
```

---

## 📖 **DICTIONARY ENDPOINTS**

### Get all dictionary words
```
GET /api/v1/dictionary/
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20)

Example:
GET /api/v1/dictionary/?page=1&limit=20
```

### Search dictionary words
```
GET /api/v1/dictionary/search
Query Parameters:
  - q: string (search query - required)
  - limit: number (default: 10)

Example:
GET /api/v1/dictionary/search?q=namaste&limit=5
```

### Get single word
```
GET /api/v1/dictionary/:word

Example:
GET /api/v1/dictionary/namaste
```

---

## 🙏 **SUBHASHIT (VERSES) ENDPOINTS**

### Get all subhashits
```
GET /api/v1/subhashit/
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20)
  - tag: string (wisdom, motivational, spiritual, etc.)
  - category: string (WISDOM, MOTIVATIONAL, SPIRITUAL, etc.)

Example:
GET /api/v1/subhashit/?page=1&limit=10&category=WISDOM
```

### Get featured subhashit
```
GET /api/v1/subhashit/featured

Returns: Single featured subhashit
```

### Get single subhashit by slug
```
GET /api/v1/subhashit/:slug

Example:
GET /api/v1/subhashit/vidya-dana
```

---

## 🎵 **SONGS ENDPOINTS** ✨ NEW

### Get all songs
```
GET /api/v1/songs/
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20)
  - category: string (DEVOTIONAL, CLASSICAL, MODERN, etc.)

Example:
GET /api/v1/songs/?page=1&limit=10&category=DEVOTIONAL
```

### Get single song by slug
```
GET /api/v1/songs/:slug

Example:
GET /api/v1/songs/gayatri-mantra
```

### Get popular/trending songs
```
GET /api/v1/songs/trending/popular

Returns: Top 6 most viewed songs
```

---

## 📖 **STORIES ENDPOINTS** ✨ NEW

### Get all stories
```
GET /api/v1/stories/
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20)
  - category: string (MYTHOLOGY, MORAL, HISTORICAL, etc.)
  - difficulty: string (BEGINNER, INTERMEDIATE, ADVANCED)

Example:
GET /api/v1/stories/?page=1&difficulty=INTERMEDIATE
```

### Get single story by slug
```
GET /api/v1/stories/:slug

Example:
GET /api/v1/stories/bhagavad-gita-chapter-1
```

### Get featured stories
```
GET /api/v1/stories/featured/stories

Returns: Top 5 most viewed stories
```

---

## 📅 **DAILY SANSKRIT ENDPOINTS** ✨ NEW

### Get today's Sanskrit content
```
GET /api/v1/daily/

Returns: Today's featured Sanskrit content (Word/Verse/Grammar/etc.)
```

### Get daily content by type
```
GET /api/v1/daily/type/:type
Query Parameters:
  - limit: number (default: 7) - Last N days of content

Supported types: WORD, SUBHASHIT, GRAMMAR, STORY

Example:
GET /api/v1/daily/type/WORD?limit=7

Returns: Last 7 days of Words of the Day
```

### Get daily content history
```
GET /api/v1/daily/history/:days

Parameters:
  - days: number (default: 30) - Number of past days to fetch

Example:
GET /api/v1/daily/history/30

Returns: Last 30 days of daily content
```

---

## 🔢 **NUMBERS ENDPOINTS**

### Get all Sanskrit numbers (1-20)
```
GET /api/v1/numbers/

Returns: All 20 Sanskrit numbers with translations
```

### Get single number
```
GET /api/v1/numbers/:number

Example:
GET /api/v1/numbers/5

Returns: Number 5 in Sanskrit (पञ्च)
```

---

## 🏥 **HEALTH CHECK**

```
GET /api/v1/health

Returns: {"status":"ok","timestamp":"2026-05-16T..."}

Use this to verify backend is running
```

---

## 🔌 **HOW TO CONNECT FROM FRONTEND**

### 1. Environment Variable
Set in `apps/web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### 2. Create API Service (`lib/api.ts`)
```typescript
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

// Example: Get grammar topics
export const fetchGrammarTopics = (page = 1, limit = 20) => {
    return api.get("/grammar/topics", { params: { page, limit } });
};

// Example: Search dictionary
export const searchDictionary = (query) => {
    return api.get("/dictionary/search", { params: { q: query } });
};

// Example: Get daily content
export const getDailyContent = () => {
    return api.get("/daily/");
};

// Example: Get all songs
export const fetchSongs = (page = 1) => {
    return api.get("/songs/", { params: { page } });
};

// Example: Get all stories
export const fetchStories = (page = 1) => {
    return api.get("/stories/", { params: { page } });
};
```

### 3. Use in Components
```typescript
"use client";
import { useState, useEffect } from "react";
import { fetchGrammarTopics } from "@/lib/api";

export default function GrammarPage() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGrammarTopics()
            .then((res) => setTopics(res.data.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {topics.map((topic) => (
                <div key={topic.slug}>
                    <h2>{topic.title}</h2>
                    <p>{topic.description}</p>
                </div>
            ))}
        </div>
    );
}
```

---

## 📝 **RESPONSE FORMAT**

All endpoints return JSON with this structure:

### Success Response
```json
{
    "success": true,
    "data": [...],
    "meta": {
        "page": 1,
        "total": 100,
        "limit": 20
    }
}
```

### Error Response
```json
{
    "success": false,
    "error": {
        "code": "ERROR_CODE",
        "message": "Error description"
    }
}
```

---

## 🚀 **TESTING WITH CURL**

```bash
# Test backend is running
curl http://localhost:3001/api/v1/health

# Get grammar topics
curl "http://localhost:3001/api/v1/grammar/topics?limit=5"

# Search dictionary
curl "http://localhost:3001/api/v1/dictionary/search?q=namaste"

# Get today's Sanskrit word
curl http://localhost:3001/api/v1/daily/

# Get songs
curl "http://localhost:3001/api/v1/songs/?limit=5"

# Get stories
curl "http://localhost:3001/api/v1/stories/?limit=5"

# Get popular songs
curl http://localhost:3001/api/v1/songs/trending/popular
```

---

## 📊 **DATABASE SEEDED DATA**

Your database now includes:

✅ **Grammar**: 2 topics (Introduction, Devanagari Script)
✅ **Dictionary**: 3 words (namaste, dharma, shanti)
✅ **Subhashits**: 2 verses (Vidya Dana, Aarogya Param Sukham)
✅ **Songs**: 2 devotional songs (Gayatri Mantra, Mahamrityunjaya)
✅ **Stories**: 2 myths (Bhagavad Gita, Ramayana)
✅ **Daily Content**: 3 days worth (Word, Verse, Grammar)
✅ **Numbers**: All 20 (1-20 in Sanskrit)
✅ **Admin User**: admin@example.com / TempPassword123!

---

## 🔄 **PAGINATION EXAMPLE**

```
Page 1: GET /api/v1/grammar/topics?page=1&limit=10
Page 2: GET /api/v1/grammar/topics?page=2&limit=10
Page 3: GET /api/v1/grammar/topics?page=3&limit=10
```

---

## 📱 **READY TO USE!**

All endpoints are now live. Start both servers:

```bash
# Terminal 1 - Backend
cd /home/sameer-khan/Desktop/sanskrit/apps/api
npm run dev

# Terminal 2 - Frontend
cd /home/sameer-khan/Desktop/sanskrit/apps/web
npm run dev
```

Then use the endpoints above to build your frontend pages! 🚀
