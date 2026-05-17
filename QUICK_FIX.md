# 🚀 QUICK FIX - Get Frontend Running

## STEP 1: Clean Install
```bash
cd /home/sameer-khan/Desktop/sanskrit

# Remove old installations
rm -rf node_modules apps/*/node_modules packages/*/node_modules .next
npm cache clean --force

# Fresh install
npm install
```

## STEP 2: Setup Prisma Client
```bash
cd apps/api
npx prisma generate
```

## STEP 3: Start Backend
```bash
cd apps/api
npm run dev
```
Should see: `🕉️  SanskritKosh API running on port 3001`

## STEP 4: Start Frontend (NEW TERMINAL)
```bash
cd apps/web
npm run dev
```
Should see: `▲ Next.js 14 ready in 2.5s`

## STEP 5: Open in Browser
```
http://localhost:3000
```

---

## 🔴 IF STILL NOT WORKING:

### Check Backend API
```bash
curl http://localhost:3001/api/v1/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Check Frontend Logs
Look for errors in the terminal where you ran `npm run dev`. Common issues:
- `Module not found: Can't resolve 'next'` → Run `npm install` again
- `ECONNREFUSED` → Backend not running on port 3001
- Port 3000 already in use → Change with: `npm run dev -- -p 3001`

### Force Clear Cache
```bash
cd apps/web
rm -rf .next
npm run dev
```

---

## ✅ What You Should See:
- **Homepage**: Sanskrit logo, hero image, quick search box, category grid
- **Navbar**: Home, Grammar, Dictionary, Subhashit, etc.
- **Footer**: Copyright and links
- **Mobile**: Bottom navigation menu

If you see a blank page with no errors, check the Environment Variables section below.
