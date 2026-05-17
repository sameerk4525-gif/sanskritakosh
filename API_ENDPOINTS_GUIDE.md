# 🔌 **COMPLETE API ENDPOINTS & FRONTEND INTEGRATION**

## ✅ **Backend Status**
- ✅ Running on: `http://localhost:3001`
- ✅ All routes registered
- ✅ Sample data seeded
- ✅ Database connected (SQLite)

---

## 📡 **ALL API ENDPOINTS**

### **1. HEALTH CHECK**
```
GET /api/v1/health
Response: { "status": "ok", "timestamp": "..." }
```

---

### **2. GRAMMAR TOPICS**

**Get all grammar topics (paginated)**
```
GET /api/v1/grammar/topics?page=1&limit=20&category=INTRODUCTION&level=BEGINNER

Response:
{
  "success": true,
  "data": [ { "id", "slug", "title", "titleSanskriti", "content", ... } ],
  "meta": { "page": 1, "total": 5 }
}
```

**Get single grammar topic**
```
GET /api/v1/grammar/topics/:slug
Example: /api/v1/grammar/topics/sanskrit-introduction

Response:
{
  "success": true,
  "data": { "id", "slug", "title", "content", ... }
}
```

---

### **3. DICTIONARY**

**Get all dictionary words (paginated)**
```
GET /api/v1/dictionary?page=1&limit=20

Response:
{
  "success": true,
  "data": [ { "id", "word", "devanagariWord", "englishMeaning", ... } ],
  "meta": { "page": 1, "total": 3 }
}
```

**Search dictionary words**
```
GET /api/v1/dictionary/search?q=namaste

Response:
{
  "success": true,
  "data": [ { matching word entries } ]
}
```

**Get single word**
```
GET /api/v1/dictionary/:word
Example: /api/v1/dictionary/namaste

Response:
{
  "success": true,
  "data": { "word": "namaste", "devanagariWord": "नमस्ते", ... }
}
```

---

### **4. SUBHASHIT (Classical Verses)**

**Get all subhashits (paginated)**
```
GET /api/v1/subhashit?page=1&limit=20&tag=wisdom&category=WISDOM

Response:
{
  "success": true,
  "data": [ { "id", "slug", "devanagariText", "englishTranslation", ... } ],
  "meta": { "page": 1, "total": 2 }
}
```

**Get featured subhashit**
```
GET /api/v1/subhashit/featured

Response:
{
  "success": true,
  "data": { featured subhashit object }
}
```

**Get single subhashit**
```
GET /api/v1/subhashit/:slug
Example: /api/v1/subhashit/vidya-dana

Response:
{
  "success": true,
  "data": { subhashit object }
}
```

---

### **5. SONGS** ⭐ NEW

**Get all songs (paginated)**
```
GET /api/v1/songs?page=1&limit=20&category=DEVOTIONAL

Response:
{
  "success": true,
  "data": [ { "id", "slug", "title", "artist", "lyrics", ... } ],
  "meta": { "page": 1, "total": 2 }
}
```

**Get single song**
```
GET /api/v1/songs/:slug
Example: /api/v1/songs/gayatri-mantra

Response:
{
  "success": true,
  "data": { song object with lyrics and audio URL }
}
```

**Get popular/trending songs**
```
GET /api/v1/songs/trending/popular

Response:
{
  "success": true,
  "data": [ top 6 most viewed songs ]
}
```

---

### **6. STORIES** ⭐ NEW

**Get all stories (paginated)**
```
GET /api/v1/stories?page=1&limit=20&category=MYTHOLOGY&difficulty=INTERMEDIATE

Response:
{
  "success": true,
  "data": [ { "id", "slug", "title", "content", "englishTranslation", ... } ],
  "meta": { "page": 1, "total": 2 }
}
```

**Get single story**
```
GET /api/v1/stories/:slug
Example: /api/v1/stories/bhagavad-gita-chapter-1

Response:
{
  "success": true,
  "data": { story object with content and translation }
}
```

**Get featured stories**
```
GET /api/v1/stories/featured/stories

Response:
{
  "success": true,
  "data": [ top 5 most viewed stories ]
}
```

---

### **7. DAILY SANSKRIT** ⭐ NEW

**Get today's Sanskrit content**
```
GET /api/v1/daily

Response:
{
  "success": true,
  "data": {
    "id": "...",
    "contentType": "WORD",
    "contentTitle": "Word of the Day: Namaste",
    "contentText": "नमस्ते - A respectful greeting",
    "viewCount": 5,
    "scheduledDate": "2026-05-16T00:00:00Z"
  }
}
```

**Get daily content by type (last N days)**
```
GET /api/v1/daily/type/WORD?limit=7

Response:
{
  "success": true,
  "data": [ last 7 days of WORD content ],
  "meta": { "count": 7, "type": "WORD" }
}
```

**Get history of daily content**
```
GET /api/v1/daily/history/30

Response:
{
  "success": true,
  "data": [ last 30 days of content ]
}
```

---

## 🎯 **ERROR RESPONSES**

All errors follow this format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

**Common error codes:**
- `NOT_FOUND` - Resource doesn't exist (404)
- `UNAUTHORIZED` - Missing or invalid auth token (401)
- `FORBIDDEN` - Access denied (403)
- `INVALID_REQUEST` - Bad request parameters (400)
- `INTERNAL_ERROR` - Server error (500)

---

## 📝 **CONNECTING FRONTEND TO BACKEND**

### **Frontend Environment Variables**

Create/update `apps/web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### **Frontend API Client** 
(Already created at `apps/web/lib/api.ts`)

```typescript
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
```

### **Example: Fetching Grammar Topics in Frontend**

```typescript
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function GrammarPage() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await api.get("/grammar/topics");
                setTopics(response.data.data);
            } catch (error) {
                console.error("Failed to fetch grammar topics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {topics.map((topic) => (
                <div key={topic.id}>
                    <h2>{topic.title}</h2>
                    <p>{topic.titleSanskriti}</p>
                </div>
            ))}
        </div>
    );
}
```

### **Example: Fetching Daily Sanskrit**

```typescript
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DailyPage() {
    const [daily, setDaily] = useState(null);

    useEffect(() => {
        const fetchDaily = async () => {
            try {
                const response = await api.get("/daily");
                setDaily(response.data.data);
            } catch (error) {
                console.error("Failed to fetch daily content:", error);
            }
        };

        fetchDaily();
    }, []);

    if (!daily) return <div>No daily content available</div>;

    return (
        <div className="p-6 bg-blue-50 rounded-lg">
            <h2 className="text-2xl font-bold">{daily.contentTitle}</h2>
            <p className="mt-2 text-lg">{daily.contentText}</p>
            <p className="mt-4 text-sm text-gray-600">
                Type: {daily.contentType}
            </p>
        </div>
    );
}
```

### **Example: Searching Dictionary**

```typescript
"use client";
import { useState } from "react";
import api from "@/lib/api";

export default function SearchPage() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.get("/dictionary/search", {
                params: { q: query },
            });
            setResults(response.data.data);
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Sanskrit words..."
                />
                <button type="submit">Search</button>
            </form>

            <div className="mt-6">
                {results.map((word) => (
                    <div key={word.id} className="p-4 border rounded mb-2">
                        <h3 className="font-bold">{word.devanagariWord} ({word.word})</h3>
                        <p>{word.englishMeaning}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

---

## 🚀 **HOW TO CALL APIS**

### **Using Axios (Recommended)**

```typescript
// GET request
const response = await api.get("/grammar/topics");

// GET with query parameters
const response = await api.get("/grammar/topics", {
    params: { page: 1, limit: 20, category: "INTRODUCTION" }
});

// GET by ID/slug
const response = await api.get("/subhashit/vidya-dana");

// Error handling
try {
    const response = await api.get("/endpoint");
    console.log(response.data.data); // Access the data
} catch (error) {
    console.error(error.response?.data?.error?.message);
}
```

### **Using Fetch API**

```typescript
// GET request
const response = await fetch(
    "http://localhost:3001/api/v1/grammar/topics"
);
const data = await response.json();
console.log(data.data); // Array of topics
```

---

## 📊 **DATABASE MODELS**

All data is stored in SQLite at:
```
/home/sameer-khan/Desktop/sanskrit/apps/api/dev.db
```

**13 Models:**
- User
- GrammarTopic
- DictionaryWord
- Subhashit
- Song ⭐
- Story ⭐
- SanskritNumber
- DailyContent ⭐
- Bookmark
- Progress
- ContactMessage

---

## ✅ **TESTING API LOCALLY**

### **Using Browser**

Simply open in your browser:
```
http://localhost:3001/api/v1/health
http://localhost:3001/api/v1/grammar/topics
http://localhost:3001/api/v1/daily
```

### **Using Thunder Client / Postman**

1. **GET** `http://localhost:3001/api/v1/grammar/topics`
2. **GET** `http://localhost:3001/api/v1/dictionary/search?q=namaste`
3. **GET** `http://localhost:3001/api/v1/songs`
4. **GET** `http://localhost:3001/api/v1/stories`
5. **GET** `http://localhost:3001/api/v1/daily`

---

## 🔐 **ADMIN CREDENTIALS**

For features requiring authentication (when added):
```
Email: admin@example.com
Password: TempPassword123!
```

---

## 🎯 **SAMPLE DATA**

Your database has been seeded with:
- ✅ 2 Grammar Topics (Sanskrit Introduction, Devanagari Script)
- ✅ 2 Subhashits (Wisdom verses)
- ✅ 3 Dictionary Words (Namaste, Dharma, Shanti)
- ✅ 20 Sanskrit Numbers (1-20)
- ✅ 2 Songs (Gayatri Mantra, Mahamrityunjaya Mantra)
- ✅ 2 Stories (Bhagavad Gita, Ramayana)
- ✅ 3 Daily Content entries (Word, Subhashit, Grammar)

---

## 📱 **RESPONSIVE DESIGN**

Frontend is fully responsive and works on:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

---

**Everything is connected and ready to use! Start both servers and begin building!** 🚀
