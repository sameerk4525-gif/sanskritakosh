# ⚡ QUICK COMMAND GUIDE - Copy & Paste These

## 🔵 GET IT RUNNING LOCALLY (RIGHT NOW)

### Terminal 1 - Setup & Start Backend
```bash
cd /home/sameer-khan/Desktop/sanskrit

# Clean start
rm -rf node_modules apps/*/node_modules packages/*/node_modules .next
npm cache clean --force

# Install everything
npm install

# Setup backend
cd apps/api
npx prisma generate
npm run dev
```

**Should see:**
```
🕉️  SanskritKosh API running on port 3001
```

---

### Terminal 2 - Start Frontend
```bash
cd /home/sameer-khan/Desktop/sanskrit/apps/web
npm run dev
```

**Should see:**
```
▲ Next.js 14 ready in ...
  ○ Listening on http://localhost:3000
```

---

### Terminal 3 - Test the Backend
```bash
curl http://localhost:3001/api/v1/health
```

**Should return:**
```json
{"status":"ok","timestamp":"2024-05-09T..."}
```

---

## 🌐 THEN DEPLOY TO SUPABASE + VERCEL

### Step 1️⃣: Create Supabase Account (5 mins)
```
1. Go to https://supabase.com
2. Click "Sign Up"
3. Sign up with GitHub (easiest)
4. Create new project
5. Save the database password somewhere safe
6. Wait 2-3 minutes for project to be created
```

### Step 2️⃣: Get Supabase Connection String (2 mins)
```
1. In Supabase dashboard: Settings → Database
2. Find "Connection string" section
3. Select "URI" tab
4. Copy the full string (includes your password)
```

### Step 3️⃣: Deploy Database to Supabase (5 mins)
```bash
cd /home/sameer-khan/Desktop/sanskrit/apps/api

# Update .env with Supabase URL
# Replace:
# DATABASE_URL=postgresql://admin:password@localhost:5432/sanskrit_db
# With:
# DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.XXXXX.supabase.co:5432/postgres?pgbouncer=true

# Run migrations
npx prisma migrate deploy

# Seed data
npx prisma db seed
```

### Step 4️⃣: Deploy Backend to Railway (10 mins)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
cd apps/api
railway init
railway up
```

**Railway will give you a URL like:** `https://sanskritapi-production.railway.app`

### Step 5️⃣: Deploy Frontend to Vercel (5 mins)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel --prod
```

**When prompted:**
- Link to existing project? → Create new
- Framework: Next.js
- Build command: npm run build

**Vercel will give you a URL like:** `https://sanskritakosh.vercel.app`

### Step 6️⃣: Connect Frontend to Backend (2 mins)

**In `apps/web/.env.production.local`:**
```env
NEXT_PUBLIC_API_URL=https://sanskritapi-production.railway.app/api/v1
```

**Then redeploy:**
```bash
cd apps/web
vercel --prod
```

---

## ✅ VERIFY EVERYTHING WORKS

```bash
# Test 1: Backend is alive
curl https://your-railway-url/api/v1/health

# Test 2: Open frontend
https://your-vercel-url

# Expected: See homepage with navbar, hero, search box
```

---

## 🎯 WHAT TO DO NOW

1. **Read Files in This Order:**
   - `QUICK_FIX.md` - If frontend isn't showing up locally
   - `SUPABASE_VERCEL_DEPLOYMENT.md` - For detailed deployment

2. **Copy Commands Above** - Run them in order

3. **Test Locally First** - Make sure it works on http://localhost:3000

4. **Deploy to Production** - Then follow deployment steps

---

## 📞 STUCK?

If something fails:

1. **Check logs:**
   ```bash
   # Backend logs (Terminal 1 should show errors)
   # Frontend logs (Terminal 2 should show errors)
   curl http://localhost:3001/api/v1/health
   ```

2. **Check environment:**
   ```bash
   # Verify Node version (needs 18+)
   node --version
   
   # Verify npm version
   npm --version
   ```

3. **Nuclear option (reset everything):**
   ```bash
   cd /home/sameer-khan/Desktop/sanskrit
   rm -rf node_modules apps/*/node_modules packages/*/node_modules .next .vercel
   npm cache clean --force
   npm install
   cd apps/api && npx prisma generate && npm run dev
   ```

---

**🚀 Good luck! You've got this!**
