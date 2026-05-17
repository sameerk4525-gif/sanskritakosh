# 🔌 QUICK CONNECT GUIDE - FRONTEND TO BACKEND

## ✅ NEW ROUTES ADDED

| Feature | Backend Path | Method |
|---------|--------------|--------|
| **Songs** | `/api/v1/songs/` | GET |
| **Songs (Single)** | `/api/v1/songs/:slug` | GET |
| **Popular Songs** | `/api/v1/songs/trending/popular` | GET |
| **Stories** | `/api/v1/stories/` | GET |
| **Stories (Single)** | `/api/v1/stories/:slug` | GET |
| **Featured Stories** | `/api/v1/stories/featured/stories` | GET |
| **Daily Content** | `/api/v1/daily/` | GET |
| **Daily by Type** | `/api/v1/daily/type/:type` | GET |
| **Daily History** | `/api/v1/daily/history/:days` | GET |

---

## 📋 ALL AVAILABLE ENDPOINTS (COMPLETE LIST)

### Grammar
- `GET /api/v1/grammar/topics` - List all topics
- `GET /api/v1/grammar/topics/:slug` - Single topic

### Dictionary
- `GET /api/v1/dictionary/` - List all words
- `GET /api/v1/dictionary/search?q=keyword` - Search words
- `GET /api/v1/dictionary/:word` - Single word

### Subhashit
- `GET /api/v1/subhashit/` - List all verses
- `GET /api/v1/subhashit/featured` - Featured verse
- `GET /api/v1/subhashit/:slug` - Single verse

### Songs ✨ NEW
- `GET /api/v1/songs/` - List all songs
- `GET /api/v1/songs/:slug` - Single song
- `GET /api/v1/songs/trending/popular` - Popular songs

### Stories ✨ NEW
- `GET /api/v1/stories/` - List all stories
- `GET /api/v1/stories/:slug` - Single story
- `GET /api/v1/stories/featured/stories` - Featured stories

### Daily Sanskrit ✨ NEW
- `GET /api/v1/daily/` - Today's content
- `GET /api/v1/daily/type/:type` - Content by type
- `GET /api/v1/daily/history/:days` - Content history

### Health
- `GET /api/v1/health` - Server health check

---

## 💻 FRONTEND INTEGRATION EXAMPLES

### Fetch Songs
```typescript
// pages/songs.tsx
"use client";
import { useState, useEffect } from "react";

export default function SongsPage() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs/`)
            .then(res => res.json())
            .then(data => setSongs(data.data));
    }, []);

    return (
        <div>
            {songs.map(song => (
                <div key={song.slug}>
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                </div>
            ))}
        </div>
    );
}
```

### Fetch Stories
```typescript
// pages/stories.tsx
"use client";
import { useState, useEffect } from "react";

export default function StoriesPage() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories/`)
            .then(res => res.json())
            .then(data => setStories(data.data));
    }, []);

    return (
        <div>
            {stories.map(story => (
                <div key={story.slug}>
                    <h2>{story.title}</h2>
                    <p>{story.devanagariTitle}</p>
                </div>
            ))}
        </div>
    );
}
```

### Fetch Daily Sanskrit
```typescript
// components/home/DailyWord.tsx
"use client";
import { useState, useEffect } from "react";

export default function DailyWord() {
    const [daily, setDaily] = useState(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/daily/`)
            .then(res => res.json())
            .then(data => setDaily(data.data));
    }, []);

    if (!daily) return <div>Loading...</div>;

    return (
        <div>
            <h3>Word of the Day</h3>
            <p>{daily.contentTitle}</p>
            <p>{daily.contentText}</p>
        </div>
    );
}
```

### Using Axios (Better)
```typescript
// lib/api.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({ baseURL: API_URL });

export const endpoints = {
    // Grammar
    grammarTopics: (page = 1) => api.get(`/grammar/topics?page=${page}`),
    
    // Dictionary
    dictionarySearch: (query) => api.get(`/dictionary/search?q=${query}`),
    
    // Subhashit
    subhashits: (page = 1) => api.get(`/subhashit/?page=${page}`),
    featuredSubhashit: () => api.get(`/subhashit/featured`),
    
    // Songs
    songs: (page = 1) => api.get(`/songs/?page=${page}`),
    popularSongs: () => api.get(`/songs/trending/popular`),
    
    // Stories
    stories: (page = 1) => api.get(`/stories/?page=${page}`),
    featuredStories: () => api.get(`/stories/featured/stories`),
    
    // Daily
    dailyContent: () => api.get(`/daily/`),
    dailyByType: (type, limit = 7) => api.get(`/daily/type/${type}?limit=${limit}`),
};
```

Then use in components:
```typescript
import { endpoints } from "@/lib/api";

// Get songs
const { data } = await endpoints.songs(1);
setSongs(data.data);

// Get daily content
const { data } = await endpoints.dailyContent();
setDailyWord(data.data);

// Search dictionary
const { data } = await endpoints.dictionarySearch("namaste");
```

---

## 🎯 WHAT TO ADD TO YOUR PAGES

| Page | API Endpoint | Data to Display |
|------|--------------|-----------------|
| `/songs` | `/api/v1/songs/` | Song list with title, artist |
| `/songs/[slug]` | `/api/v1/songs/:slug` | Full song details, lyrics |
| `/stories` | `/api/v1/stories/` | Story list |
| `/stories/[slug]` | `/api/v1/stories/:slug` | Full story with translation |
| `/daily` | `/api/v1/daily/` | Today's featured content |
| Home Banner | `/api/v1/songs/trending/popular` | Top 3 songs |
| Home Section | `/api/v1/daily/` | Daily word/verse |

---

## ✨ DATABASE SEEDED WITH:

```
✅ 2 Songs (Gayatri Mantra, Mahamrityunjaya)
✅ 2 Stories (Bhagavad Gita, Ramayana)  
✅ 3 Daily Content entries
✅ + Previous: Grammar (2), Dictionary (3), Subhashits (2)
```

---

## 🔑 KEY POINTS

1. **Base URL**: `http://localhost:3001/api/v1`
2. **All responses**: `{ success: true, data: [...], meta: {...} }`
3. **All GETs**: Use query params for pagination
4. **Slugs**: Use in URL for single item (e.g., `/songs/gayatri-mantra`)

---

## ✅ READY TO BUILD!

Both servers running? Then use the endpoints above to fetch data and display in your React components! 🚀

See full details in: **[API_ENDPOINTS.md](API_ENDPOINTS.md )**
