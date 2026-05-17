# 🚀 SUPABASE + VERCEL COMPLETE DEPLOYMENT GUIDE

## 📋 TABLE OF CONTENTS
1. [Supabase Database Setup](#-supabase-database-setup)
2. [Backend Deployment (Railway)](#backend-deployment-railway)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Connect Everything](#-connect-everything)
5. [Verification & Testing](#-verification--testing)

---

# 🗄️ SUPABASE DATABASE SETUP

## Step 1: Create Supabase Project

1. Go to **https://supabase.com** and sign up (free)
2. Click **"New Project"**
3. Fill in:
   - **Name**: SanskritKosh
   - **Database Password**: Save this! (Min 12 chars, use strong password)
   - **Region**: Choose closest to you (e.g., US-East, EU-Central)
4. Click **"Create new project"** (Wait 2-3 minutes)

## Step 2: Get Connection String

1. After project is created, go to **Settings** → **Database**
2. Under "Connection string", select **"URI"**
3. Look for the string like:
```
postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
```

4. Copy this string and **keep it safe**

## Step 3: Setup Prisma with Supabase

### Update `apps/api/.env`:

```env
# Replace this line:
DATABASE_URL=postgresql://admin:password@localhost:5432/sanskrit_db

# With Supabase (the full URI you copied):
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.XXXXXXXXXXXXXX.supabase.co:5432/postgres?pgbouncer=true
```

## Step 4: Run Migrations on Supabase

```bash
cd apps/api

# Install dependencies first
npm install

# Generate Prisma client
npx prisma generate

# Deploy migrations to Supabase
npx prisma migrate deploy

# Seed data (creates admin user, sample data)
npx prisma db seed
```

✅ Your Supabase database is now ready with all tables!

### Verify in Supabase Dashboard:
1. Go to **Supabase Dashboard** → Your Project
2. Click **"Table Editor"** (left sidebar)
3. You should see: User, GrammarTopic, DictionaryWord, Subhashit, etc.

---

# 🚀 BACKEND DEPLOYMENT (Railway)

## Step 1: Prepare Your Code for Production

### Update `apps/api/.env` for production:

```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.vercel.app
JWT_SECRET=generate_new_with: openssl rand -base64 32
NEXTAUTH_SECRET=generate_new_with: openssl rand -base64 32
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.XXXXXXXXXXXXXX.supabase.co:5432/postgres?pgbouncer=true
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_INITIAL_PASSWORD=ChangeMeAfterFirstLogin123!
```

**Generate secure random strings:**
```bash
# In terminal:
openssl rand -base64 32
# Copy output to JWT_SECRET and NEXTAUTH_SECRET
```

## Step 2: Deploy Backend to Railway

### Option A: Railway CLI (Fastest)

```bash
# 1. Install Railway CLI
npm i -g @railway/cli

# 2. Login to Railway
railway login

# 3. Go to backend folder
cd apps/api

# 4. Initialize Railway project
railway init

# 5. Link to project
railway link

# 6. Add PostgreSQL plugin (from Railway dashboard)
# → Go to railway.app dashboard → Your project → Add service → PostgreSQL

# 7. Set environment variables
railway variables set NODE_ENV production
railway variables set JWT_SECRET "your_generated_secret_here"
railway variables set NEXTAUTH_SECRET "your_generated_secret_here"
railway variables set FRONTEND_URL "https://your-app.vercel.app"
railway variables set DATABASE_URL "postgresql://postgres:PASSWORD@supabase..."
railway variables set ADMIN_EMAIL "admin@example.com"

# 8. Deploy
railway up
```

Railway will give you a URL like: `https://sanskritapi.railway.app`

### Option B: Railway Dashboard (Manual)

1. Go to **https://railway.app**
2. Sign up/Login
3. Click **"New Project"** → **"Deploy from GitHub"**
4. Select your repository → apps/api folder
5. Add environment variables (see above)
6. Click **"Deploy"**

## Step 3: Run Migrations on Production

```bash
# Option 1: Via Railway CLI
railway run npx prisma migrate deploy
railway run npx prisma db seed

# Option 2: SSH into Railway and run commands
# (Available in Rail​way dashboard)
```

✅ Backend is now running on Railway!

---

# 🌐 FRONTEND DEPLOYMENT (Vercel)

## Step 1: Prepare Frontend for Production

### Update `apps/web/.env.production.local`:

```env
NEXT_PUBLIC_API_URL=https://your-railway-backend.railway.app/api/v1
```

### Create `apps/web/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url"
  }
}
```

## Step 2: Deploy Frontend to Vercel

### Option A: Vercel CLI (Fastest)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Go to frontend folder
cd apps/web

# 3. Deploy
vercel

# 4. Follow prompts:
# - Link to existing project? → Select your project
# - Build command? → npm run build
# - Deploy → Yes

# 5. Set environment variables
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://your-railway-backend.railway.app/api/v1
```

Vercel will give you a URL like: `https://sanskritakosh.vercel.app`

### Option B: Vercel Dashboard (Manual)

1. Go to **https://vercel.com**
2. Sign up/Login
3. Click **"Add New..."** → **"Project"**
4. Select your GitHub repository
5. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Add environment variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-railway-backend.railway.app/api/v1`
7. Click **"Deploy"**

✅ Frontend is now running on Vercel!

---

# 🔗 CONNECT EVERYTHING

## Step 1: Update Backend to Accept Frontend URL

In `apps/api/.env`:
```env
FRONTEND_URL=https://your-app.vercel.app
```

Redeploy backend:
```bash
cd apps/api
railway up
```

## Step 2: Update Frontend to Use Backend URL

In `apps/web/.env.production.local`:
```env
NEXT_PUBLIC_API_URL=https://your-railway-backend-url/api/v1
```

Deploy frontend:
```bash
cd apps/web
vercel --prod
```

---

# ✅ VERIFICATION & TESTING

## Test Backend Health

```bash
curl https://your-railway-backend.railway.app/api/v1/health

# Expected response:
# {"status":"ok","timestamp":"2024-05-09T10:30:00.000Z"}
```

## Test API Endpoints

```bash
# Grammar endpoint
curl https://your-railway-backend.railway.app/api/v1/grammar/topics

# Dictionary search
curl "https://your-railway-backend.railway.app/api/v1/dictionary/search?q=namaste"

# Subhashit featured
curl https://your-railway-backend.railway.app/api/v1/subhashit/featured
```

## Test Frontend

1. Open **https://your-app.vercel.app**
2. Check:
   - ✅ Homepage loads with content
   - ✅ Navbar is visible
   - ✅ Quick search works
   - ✅ Click "Grammar" / "Dictionary" → pages load
   - ✅ Mobile menu works (view on phone)

## Check Logs

**Backend (Railway):**
```bash
railway logs

# Or in Railway dashboard → Deployments → View logs
```

**Frontend (Vercel):**
- Go to **vercel.com** → Your project → **Deployments** → Open deployment → **Logs**

---

# 📱 CUSTOM DOMAIN (OPTIONAL)

## Add Domain to Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Domains**
2. Add your domain (e.g., sanskritakosh.com)
3. Follow DNS setup instructions

## Update Backend URL

After custom domain is live:
```bash
cd apps/api
railway variables set FRONTEND_URL "https://sanskritakosh.com"
railway up
```

---

# 🔒 SECURITY CHECKLIST

- [ ] Change admin password after first login
- [ ] Use strong random secrets for JWT_SECRET and NEXTAUTH_SECRET
- [ ] Enable HTTPS on your domain (Vercel does this automatically)
- [ ] Set up database backups (Supabase does this automatically)
- [ ] Monitor backend logs for errors
- [ ] Enable rate limiting (already configured)
- [ ] Hide .env files from git (already in .gitignore)

---

# 🆘 TROUBLESHOOTING

### "Database connection refused"
- Check DATABASE_URL is copied correctly
- Verify postgres user exists in Supabase
- Ensure Supabase project is not suspended

### "API calls return 500 error"
```bash
# Check backend logs
railway logs

# Common causes:
# - Database URL incorrect
# - Migrations not run: railway run npx prisma migrate deploy
# - Seed data not loaded: railway run npx prisma db seed
```

### "Frontend shows blank page"
- Check NEXT_PUBLIC_API_URL is set correctly
- Open browser console: F12 → Console tab → Look for errors
- Check network tab: Are API calls going to right URL?

### "CORS errors"
- Backend FRONTEND_URL must match frontend deployment URL
- Redeploy backend after changing FRONTEND_URL

---

# 📞 SUPPORT LINKS

- **Supabase Docs**: https://supabase.com/docs
- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎉 DEPLOYMENT COMPLETE!

Your SanskritKosh platform is now live globally! 🌍

**Access Points:**
- Frontend: https://your-app.vercel.app
- Backend: https://your-api.railway.app
- Database: Supabase Dashboard (managed)

**Next Steps:**
1. Test all features thoroughly
2. Add custom domain for branding
3. Monitor logs and performance
4. Setup automated backups
5. Configure analytics

---
